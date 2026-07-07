import { describe, expect, it } from "vitest";
import { CheckoutRequestSchema, ProductCreateSchema } from "@/lib/validation";

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

describe("product validation", () => {
  const baseProduct = {
    name: "Paracetamol",
    price: 12.5,
    quantity: 10,
  };

  it("normalizes dosage guide age ranges", () => {
    const parsed = ProductCreateSchema.safeParse({
      ...baseProduct,
      dosageGuide: {
        age0To10: " 5 ml twice daily ",
        age11To17: "",
        age18Plus: "1 tablet every 8 hours",
      },
    });

    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    expect(parsed.data.dosageGuide).toEqual({
      age0To10: "5 ml twice daily",
      age18Plus: "1 tablet every 8 hours",
    });
  });

  it("stores blank dosage guides as null", () => {
    const parsed = ProductCreateSchema.safeParse({
      ...baseProduct,
      dosageGuide: {
        age0To10: "",
        age11To17: " ",
        age18Plus: "",
      },
    });

    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    expect(parsed.data.dosageGuide).toBeNull();
  });
});
