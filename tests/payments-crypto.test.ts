import crypto from "crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createReceiptToken,
  verifyPaystackWebhookSignature,
  verifyReceiptToken,
} from "@/lib/payment-security";

describe("payment crypto helpers", () => {
  beforeEach(() => {
    vi.stubEnv("ORDER_RECEIPT_SECRET", "test-receipt-secret");
    vi.stubEnv("PAYSTACK_SECRET_KEY", "test-paystack-secret");
  });

  it("creates and verifies receipt tokens", () => {
    const reference = "comfi_test_reference_123";
    const token = createReceiptToken(reference);

    expect(verifyReceiptToken(reference, token)).toBe(true);
    expect(verifyReceiptToken(reference, "deadbeef")).toBe(false);
    expect(verifyReceiptToken("other-ref", token)).toBe(false);
  });

  it("verifies Paystack webhook signatures", () => {
    const body = JSON.stringify({ event: "charge.success", data: { reference: "abc" } });
    const signature = crypto
      .createHmac("sha512", "test-paystack-secret")
      .update(body)
      .digest("hex");

    expect(verifyPaystackWebhookSignature(body, signature)).toBe(true);
    expect(verifyPaystackWebhookSignature(body, "invalid")).toBe(false);
  });
});
