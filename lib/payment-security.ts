import crypto from "crypto";

function paystackSecret() {
  return process.env.PAYSTACK_SECRET_KEY;
}

function receiptSecret() {
  return process.env.ORDER_RECEIPT_SECRET;
}

export class PaymentSecurityError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function requiredPaystackSecret() {
  const secret = paystackSecret();
  if (!secret) {
    throw new PaymentSecurityError("PAYSTACK_SECRET_KEY is not configured.");
  }

  return secret;
}

function requiredReceiptSecret() {
  if (process.env.NODE_ENV === "production") {
    const productionSecret = receiptSecret();
    if (!productionSecret) {
      throw new PaymentSecurityError("ORDER_RECEIPT_SECRET is not configured.");
    }
    return productionSecret;
  }

  const secret = receiptSecret() ?? paystackSecret();
  if (!secret) {
    throw new PaymentSecurityError(
      "ORDER_RECEIPT_SECRET or PAYSTACK_SECRET_KEY is not configured.",
    );
  }

  return secret;
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
