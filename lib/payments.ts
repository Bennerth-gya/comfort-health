import "server-only";

import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { CheckoutRequestSchema, validationMessage } from "@/lib/validation";
import type { Prisma } from "@/generated/db";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const ORDER_RECEIPT_SECRET = process.env.ORDER_RECEIPT_SECRET;
const MONEY_FACTOR = 100;
const CURRENCY = "GHS";
const PAID_STATUSES = new Set(["paid", "paid_fulfillment_review"]);

export class PaymentFlowError extends Error {
  constructor(
    message: string,
    public readonly status = 400,
  ) {
    super(message);
  }
}

type CheckoutItemInput = {
  id: string;
  quantity: number;
};

type PaystackInitializeResponse = {
  status?: boolean;
  message?: string;
  data?: {
    authorization_url?: string;
    access_code?: string;
    reference?: string;
  };
};

type PaystackVerifyResponse = {
  status?: boolean;
  message?: string;
  data?: {
    id?: number | string;
    reference?: string;
    status?: string;
    amount?: number;
    currency?: string;
    paid_at?: string | null;
    gateway_response?: string;
  };
};

type CheckoutResponse = {
  order: PublicOrder;
  paystack: {
    authorization_url?: string;
    access_code?: string;
    reference?: string;
  };
};

export type PublicOrder = {
  reference: string;
  email: string;
  amount: number;
  currency: string;
  status: string;
  paidAt: string | null;
  items: Array<{
    id: string;
    productId: string;
    name: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
    imageUrl: string | null;
    category: string | null;
  }>;
};

export function isPaidOrderStatus(status: string | null | undefined) {
  return !!status && PAID_STATUSES.has(status);
}

function requiredPaystackSecret() {
  if (!PAYSTACK_SECRET_KEY) {
    throw new PaymentFlowError("PAYSTACK_SECRET_KEY is not configured.", 500);
  }

  return PAYSTACK_SECRET_KEY;
}

function requiredReceiptSecret() {
  const secret = ORDER_RECEIPT_SECRET ?? PAYSTACK_SECRET_KEY;
  if (!secret) {
    throw new PaymentFlowError("ORDER_RECEIPT_SECRET or PAYSTACK_SECRET_KEY is not configured.", 500);
  }

  return secret;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function normalizeCheckoutItems(value: unknown): CheckoutItemInput[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new PaymentFlowError("Cart items are required.");
  }

  if (value.length > 50) {
    throw new PaymentFlowError("Too many cart items.");
  }

  return value.map((item) => {
    if (!isRecord(item) || typeof item.id !== "string") {
      throw new PaymentFlowError("Invalid cart item.");
    }

    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      throw new PaymentFlowError("Invalid item quantity.");
    }

    return {
      id: item.id,
      quantity,
    };
  });
}

function toPesewas(amount: unknown) {
  return Math.round(Number(amount) * MONEY_FACTOR);
}

function toMoney(pesewas: number) {
  return (pesewas / MONEY_FACTOR).toFixed(2);
}

function makeReference() {
  return `comfi_${crypto.randomUUID().replaceAll("-", "").slice(0, 24)}`;
}

export function createReceiptToken(reference: string) {
  return crypto
    .createHmac("sha256", requiredReceiptSecret())
    .update(reference)
    .digest("hex");
}

export function verifyReceiptToken(reference: string, token: string | null | undefined) {
  if (!token) return false;

  const expected = Buffer.from(createReceiptToken(reference), "hex");
  const provided = Buffer.from(token, "hex");

  if (expected.length !== provided.length) {
    return false;
  }

  return crypto.timingSafeEqual(expected, provided);
}

function publicOrder(
  order: Prisma.OrderGetPayload<{ include: { items: true } }>,
): PublicOrder {
  return {
    reference: order.reference,
    email: order.email,
    amount: Number(order.amount),
    currency: order.currency,
    status: order.status,
    paidAt: order.paidAt?.toISOString() ?? null,
    items: order.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      name: item.name,
      unitPrice: Number(item.unitPrice),
      quantity: item.quantity,
      lineTotal: Number(item.lineTotal),
      imageUrl: item.imageUrl,
      category: item.category,
    })),
  };
}

function callbackUrl(request: Request, reference: string) {
  const configuredAppUrl = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  const origin = configuredAppUrl
    ? new URL(configuredAppUrl).origin
    : new URL(request.url).origin;
  const url = new URL("/order-success", origin);
  url.searchParams.set("reference", reference);
  url.searchParams.set("receipt", createReceiptToken(reference));
  return url.toString();
}

function isPrismaError(error: unknown, code: string) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === code
  );
}

async function existingCheckoutResponse(
  idempotencyKey: string,
): Promise<CheckoutResponse | null> {
  const existing = await prisma.order.findUnique({
    where: { idempotencyKey },
    include: {
      items: true,
      payment: true,
    },
  });

  if (!existing) {
    return null;
  }

  if (!existing.payment?.authorizationUrl) {
    throw new PaymentFlowError(
      "Checkout is already being prepared. Please wait a moment and try again.",
      409,
    );
  }

  return {
    order: publicOrder(existing),
    paystack: {
      authorization_url: existing.payment.authorizationUrl,
      access_code: existing.payment.accessCode ?? undefined,
      reference: existing.reference,
    },
  };
}

export async function createPaystackCheckout(request: Request, body: unknown) {
  const secret = requiredPaystackSecret();
  const parsed = CheckoutRequestSchema.safeParse(body);

  if (!parsed.success) {
    throw new PaymentFlowError(validationMessage(parsed.error));
  }

  const { email, idempotencyKey, items: requestedItems } = parsed.data;
  const existing = await existingCheckoutResponse(idempotencyKey);
  if (existing) {
    return existing;
  }

  const requestedById = new Map(requestedItems.map((item) => [item.id, item]));

  const products = await prisma.product.findMany({
    where: {
      id: { in: requestedItems.map((item) => item.id) },
      activeListing: true,
    },
    select: {
      id: true,
      userId: true,
      name: true,
      price: true,
      quantity: true,
      imageUrl: true,
      category: true,
      prescriptionRequired: true,
    },
  });

  if (products.length !== requestedItems.length) {
    throw new PaymentFlowError("One or more products are no longer available.");
  }

  const sellerIds = new Set(products.map((product) => product.userId));
  if (sellerIds.size !== 1) {
    throw new PaymentFlowError("Cart items must belong to a single seller.");
  }

  const sellerId = products[0]?.userId;
  if (!sellerId) {
    throw new PaymentFlowError("Unable to determine seller for this checkout.");
  }

  const productsById = new Map(products.map((product) => [product.id, product]));
  const orderItems = requestedItems.map((requested) => {
    const product = productsById.get(requested.id);
    if (!product || !requestedById.has(product.id)) {
      throw new PaymentFlowError("Invalid cart item.");
    }

    if (product.prescriptionRequired) {
      throw new PaymentFlowError(`${product.name} requires prescription review before checkout.`);
    }

    if (product.quantity < requested.quantity) {
      throw new PaymentFlowError(`${product.name} does not have enough stock.`);
    }

    const unitPricePesewas = toPesewas(product.price);
    const lineTotalPesewas = unitPricePesewas * requested.quantity;

    return {
      productId: product.id,
      name: product.name,
      unitPrice: toMoney(unitPricePesewas),
      quantity: requested.quantity,
      lineTotal: toMoney(lineTotalPesewas),
      imageUrl: product.imageUrl,
      category: product.category,
      lineTotalPesewas,
    };
  });

  const amountPesewas = orderItems.reduce((sum, item) => sum + item.lineTotalPesewas, 0);
  if (amountPesewas <= 0) {
    throw new PaymentFlowError("Order amount must be greater than zero.");
  }

  const reference = makeReference();
  let order: Prisma.OrderGetPayload<{ include: { items: true } }>;

  try {
    order = await prisma.order.create({
      data: {
        reference,
        idempotencyKey,
        sellerId,
        email,
        amount: toMoney(amountPesewas),
        currency: CURRENCY,
        items: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            name: item.name,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            lineTotal: item.lineTotal,
            imageUrl: item.imageUrl,
            category: item.category,
          })),
        },
        payment: {
          create: {
            reference,
            amount: toMoney(amountPesewas),
            currency: CURRENCY,
          },
        },
      },
      include: {
        items: true,
      },
    });
  } catch (error) {
    if (isPrismaError(error, "P2002")) {
      const checkout = await existingCheckoutResponse(idempotencyKey);
      if (checkout) {
        return checkout;
      }
    }

    throw error;
  }

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amountPesewas,
      currency: CURRENCY,
      reference,
      callback_url: callbackUrl(request, reference),
      metadata: {
        source: "Comfi Health checkout",
        orderId: order.id,
        itemCount: order.items.length,
      },
    }),
  });

  const paystackData = (await response.json()) as PaystackInitializeResponse;

  if (
    !response.ok ||
    paystackData.status !== true ||
    !paystackData.data?.authorization_url ||
    (paystackData.data.reference && paystackData.data.reference !== reference)
  ) {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: "payment_initialization_failed",
        payment: {
          update: {
            status: "initialization_failed",
          },
        },
      },
    });

    throw new PaymentFlowError(
      paystackData.message ?? "Failed to initialize Paystack transaction.",
      response.status || 502,
    );
  }

  await prisma.paymentTransaction.update({
    where: { reference },
    data: {
      authorizationUrl: paystackData.data.authorization_url,
      accessCode: paystackData.data.access_code ?? null,
      status: "initialized",
    },
  });

  return {
    order: publicOrder(order),
    paystack: paystackData.data,
  };
}

async function fetchPaystackVerification(reference: string) {
  const secret = requiredPaystackSecret();
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    },
  );

  const data = (await response.json()) as PaystackVerifyResponse;
  if (!response.ok || data.status !== true) {
    throw new PaymentFlowError(data.message ?? "Unable to verify Paystack transaction.", response.status || 502);
  }

  return data;
}

function paystackPayload(data: PaystackVerifyResponse): Prisma.InputJsonObject {
  return {
    id: data.data?.id ?? null,
    reference: data.data?.reference ?? null,
    status: data.data?.status ?? null,
    amount: data.data?.amount ?? null,
    currency: data.data?.currency ?? null,
    paid_at: data.data?.paid_at ?? null,
    gateway_response: data.data?.gateway_response ?? null,
  };
}

export async function finalizeVerifiedPayment(reference: string, verification?: PaystackVerifyResponse) {
  if (!reference.trim()) {
    throw new PaymentFlowError("Payment reference is required.");
  }

  const paystack = verification ?? (await fetchPaystackVerification(reference));
  const transaction = paystack.data;

  if (!transaction) {
    throw new PaymentFlowError("Paystack verification did not include transaction data.", 502);
  }

  if (transaction.reference !== reference) {
    throw new PaymentFlowError("Payment reference mismatch.", 409);
  }

  const result = await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe("SET LOCAL interactive_transaction_timeout = '30000'");
    const order = await tx.order.findUnique({
      where: { reference },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new PaymentFlowError("Order not found.", 404);
    }

    if (isPaidOrderStatus(order.status)) {
      return {
        order: publicOrder(order),
        shouldSendReceipt: false,
      };
    }

    if (transaction.status?.toLowerCase() !== "success") {
      await tx.paymentTransaction.update({
        where: { reference },
        data: {
          status: transaction.status ?? "not_successful",
          rawPayload: paystackPayload(paystack),
        },
      });
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: "payment_not_successful",
        },
      });
      throw new PaymentFlowError("Payment has not been successfully completed.", 409);
    }

    const expectedAmount = toPesewas(order.amount);
    if (Number(transaction.amount) !== expectedAmount || transaction.currency !== order.currency) {
      await tx.paymentTransaction.update({
        where: { reference },
        data: {
          status: "verification_mismatch",
          rawPayload: paystackPayload(paystack),
        },
      });
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: "verification_mismatch",
        },
      });
      throw new PaymentFlowError("Payment amount or currency did not match the order.", 409);
    }

    const claim = await tx.order.updateMany({
      where: {
        id: order.id,
        status: {
          notIn: Array.from(PAID_STATUSES),
        },
      },
      data: {
        status: "processing_payment",
      },
    });

    if (claim.count !== 1) {
      const latest = await tx.order.findUnique({
        where: { id: order.id },
        include: {
          items: true,
        },
      });

      if (latest && isPaidOrderStatus(latest.status)) {
        return {
          order: publicOrder(latest),
          shouldSendReceipt: false,
        };
      }

      throw new PaymentFlowError("Order is already being processed.", 409);
    }

    const fulfillmentReviewItems: string[] = [];

    for (const item of order.items) {
      const stockUpdate = await tx.product.updateMany({
        where: {
          id: item.productId,
          activeListing: true,
          quantity: {
            gte: item.quantity,
          },
        },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      });

      if (stockUpdate.count !== 1) {
        fulfillmentReviewItems.push(item.name);
      }
    }

    const paidAt = transaction.paid_at ? new Date(transaction.paid_at) : new Date();
    const needsFulfillmentReview = fulfillmentReviewItems.length > 0;

    const paidOrder = await tx.order.update({
      where: { id: order.id },
      data: {
        status: needsFulfillmentReview ? "paid_fulfillment_review" : "paid",
        paidAt,
        payment: {
          update: {
            status: needsFulfillmentReview ? "success_fulfillment_review" : "success",
            providerReference: transaction.id === undefined ? reference : String(transaction.id),
            paidAt,
            rawPayload: {
              ...paystackPayload(paystack),
              fulfillmentReviewItems,
            },
          },
        },
      },
      include: {
        items: true,
      },
    });

    return {
      order: publicOrder(paidOrder),
      shouldSendReceipt: true,
    };
  });

  if (result.shouldSendReceipt) {
    await sendReceipt(result.order);
  }

  return result.order;
}

async function sendReceipt(order: PublicOrder) {
  try {
    const { sendOrderReceiptEmail } = await import("@/lib/email");
    await sendOrderReceiptEmail(order);
  } catch (error) {
    console.error("Failed to send order receipt email", error);
  }
}

export async function getOrder(reference: string) {
  const order = await prisma.order.findUnique({
    where: { reference },
    include: {
      items: true,
    },
  });

  return order ? publicOrder(order) : null;
}

export function verifyPaystackWebhookSignature(body: string, signature: string | null) {
  const secret = requiredPaystackSecret();
  if (!signature) return false;

  const expected = crypto.createHmac("sha512", secret).update(body).digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}
