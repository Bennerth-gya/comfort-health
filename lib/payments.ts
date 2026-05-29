import "server-only";

import crypto from "crypto";
import { sendOrderReceiptEmail } from "@/lib/email";
import { createReceiptToken } from "@/lib/payment-security";
import { prisma } from "@/lib/prisma";

export {
  createReceiptToken,
  verifyPaystackWebhookSignature,
  verifyReceiptToken,
} from "@/lib/payment-security";
import {
  CheckoutRequestSchema,
  validationMessage,
} from "@/lib/validation";
import type { Prisma } from "@/generated/db";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
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

function toPesewas(amount: unknown) {
  return Math.round(Number(amount) * MONEY_FACTOR);
}

function toMoney(pesewas: number) {
  return (pesewas / MONEY_FACTOR).toFixed(2);
}

function makeReference() {
  return `comfi_${crypto.randomUUID().replaceAll("-", "").slice(0, 24)}`;
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

export async function createPaystackCheckout(request: Request, body: unknown) {
  const secret = requiredPaystackSecret();

  const parsed = CheckoutRequestSchema.safeParse(body);
  if (!parsed.success) {
    throw new PaymentFlowError(validationMessage(parsed.error));
  }

  const { email, idempotencyKey } = parsed.data;
  const requestedItems: CheckoutItemInput[] = parsed.data.items;
  const requestedById = new Map(requestedItems.map((item) => [item.id, item]));

  const existingOrder = await prisma.order.findUnique({
    where: { idempotencyKey },
    include: {
      items: true,
      payment: true,
    },
  });

  if (existingOrder) {
    if (existingOrder.email !== email) {
      throw new PaymentFlowError("Checkout idempotency key is already in use.", 409);
    }

    if (isPaidOrderStatus(existingOrder.status)) {
      throw new PaymentFlowError("This checkout has already been paid.", 409);
    }

    if (!existingOrder.payment?.authorizationUrl) {
      throw new PaymentFlowError("Existing checkout is not payable. Start a new checkout.", 409);
    }

    return {
      order: publicOrder(existingOrder),
      paystack: {
        authorization_url: existingOrder.payment.authorizationUrl,
        access_code: existingOrder.payment.accessCode ?? undefined,
        reference: existingOrder.reference,
      },
    };
  }

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
    throw new PaymentFlowError("Cart items must belong to one seller.");
  }

  const sellerId = products[0]?.userId;
  if (!sellerId) {
    throw new PaymentFlowError("Unable to resolve seller for checkout.");
  }

  const orderItems = products.map((product) => {
    const requested = requestedById.get(product.id);
    if (!requested) {
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
  const order = await prisma.order.create({
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

  if (!response.ok || paystackData.status !== true || !paystackData.data?.authorization_url) {
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
      status: "initialized",
      authorizationUrl: paystackData.data.authorization_url,
      accessCode: paystackData.data.access_code ?? null,
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

export async function finalizeVerifiedPayment(reference: string) {
  if (!reference.trim()) {
    throw new PaymentFlowError("Payment reference is required.");
  }

  const paystack = await fetchPaystackVerification(reference);
  const transaction = paystack.data;

  if (transaction?.status !== "success") {
    throw new PaymentFlowError(paystack.message ?? "Payment is not successful yet.", 402);
  }

  return prisma.$transaction(async (tx) => {
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
      return publicOrder(order);
    }

    const expectedAmount = toPesewas(order.amount);
    const isVerificationMismatch =
      transaction.reference !== reference ||
      Number(transaction.amount) !== expectedAmount ||
      transaction.currency !== order.currency;

    if (isVerificationMismatch) {
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
      throw new PaymentFlowError("Payment reference, amount, or currency did not match the order.", 409);
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
        return publicOrder(latest);
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

    const parsedPaidAt = transaction.paid_at ? new Date(transaction.paid_at) : null;
    const paidAt =
      parsedPaidAt && !Number.isNaN(parsedPaidAt.getTime())
        ? parsedPaidAt
        : new Date();
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

    const result = publicOrder(paidOrder);

    void sendOrderReceiptEmail(result).catch((emailError) => {
      console.error("Order receipt email failed", emailError);
    });

    return result;
  }, {
    maxWait: 5_000,
    timeout: 10_000,
  });
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

