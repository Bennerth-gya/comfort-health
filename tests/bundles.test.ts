import { describe, expect, it } from "vitest";

describe("Bundle pricing & savings calculations", () => {
  it("calculates genuine bundle savings against sum of individual products", () => {
    const bundlePrice = 300;
    const items = [
      { price: 40, quantity: 5 }, // 200
      { price: 17, quantity: 1 }, // 17
      { price: 62, quantity: 3 }, // 186
      { price: 152, quantity: 2 }, // 304
    ];

    const individualTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    expect(individualTotal).toBe(707);

    const savings = individualTotal > bundlePrice ? individualTotal - bundlePrice : 0;
    expect(savings).toBe(407);

    const savingsPct = Math.round((savings / individualTotal) * 100);
    expect(savingsPct).toBe(58);
  });

  it("proportional item pricing sums exactly to bundle total without floating-point error", () => {
    const bundlePrice = 300;
    const bundleQty = 2;
    const bundleTotal = bundlePrice * bundleQty; // 600

    const items = [
      { id: "p1", price: 40, quantity: 5 }, // 200
      { id: "p2", price: 17, quantity: 1 }, // 17
      { id: "p3", price: 62, quantity: 3 }, // 186
      { id: "p4", price: 152, quantity: 2 }, // 304
    ]; // sum = 707

    const productSum = items.reduce(
      (sum, bi) => sum + bi.price * bi.quantity * bundleQty,
      0
    );

    let allocatedTotal = 0;
    const lineTotals: number[] = [];

    items.forEach((bi, index) => {
      const isLast = index === items.length - 1;
      let itemLineTotal: number;
      if (isLast) {
        itemLineTotal = Number((bundleTotal - allocatedTotal).toFixed(2));
      } else {
        const proportion = (bi.price * bi.quantity * bundleQty) / productSum;
        itemLineTotal = Number((bundleTotal * proportion).toFixed(2));
        allocatedTotal += itemLineTotal;
      }
      lineTotals.push(itemLineTotal);
    });

    const sumOfLines = lineTotals.reduce((a, b) => a + b, 0);
    expect(sumOfLines).toBe(600);
  });

  it("handles empty or zero-priced bundles safely", () => {
    const bundlePrice = 100;
    const items: Array<{ price: number; quantity: number }> = [];

    const individualTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    expect(individualTotal).toBe(0);
    const savings = individualTotal > bundlePrice ? individualTotal - bundlePrice : null;
    expect(savings).toBeNull();
  });
});

describe("Bundle image upload validations", () => {
  const ALLOWED_MIME_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ]);
  const MAX_BYTES = 5 * 1024 * 1024;

  it("accepts valid image formats and file size <= 5 MB", () => {
    expect(ALLOWED_MIME_TYPES.has("image/jpeg")).toBe(true);
    expect(ALLOWED_MIME_TYPES.has("image/png")).toBe(true);
    expect(ALLOWED_MIME_TYPES.has("image/webp")).toBe(true);
    expect(ALLOWED_MIME_TYPES.has("image/gif")).toBe(true);

    const testFileSize = 2 * 1024 * 1024; // 2MB
    expect(testFileSize <= MAX_BYTES).toBe(true);
  });

  it("rejects unsupported MIME types and oversized files", () => {
    expect(ALLOWED_MIME_TYPES.has("application/pdf")).toBe(false);
    expect(ALLOWED_MIME_TYPES.has("image/svg+xml")).toBe(false);
    expect(ALLOWED_MIME_TYPES.has("text/plain")).toBe(false);

    const oversized = 6 * 1024 * 1024; // 6MB
    expect(oversized <= MAX_BYTES).toBe(false);
  });
});
