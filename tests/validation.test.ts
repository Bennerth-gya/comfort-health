import { describe, expect, it } from "vitest";
import { CheckoutRequestSchema } from "@/lib/validation";

describe("checkout validation", () => {
  it("rejects duplicate cart items", () => {
    const parsed = CheckoutRequestSchema.safeParse({
      email: "buyer@example.com",
      idempotencyKey: "checkout-key-12345678",
      items: [
        { id: "prod-1", quantity: 1 },
        { id: "prod-1", quantity: 2 },
      ],
    });

    expect(parsed.success).toBe(false);
  });

  it("accepts a valid checkout payload", () => {
    const parsed = CheckoutRequestSchema.safeParse({
      email: "buyer@example.com",
      idempotencyKey: "checkout-key-12345678",
      items: [{ id: "prod-1", quantity: 2 }],
    });

    expect(parsed.success).toBe(true);
  });
});
