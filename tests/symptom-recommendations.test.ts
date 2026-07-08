import { describe, expect, it } from "vitest";
import { buildFallbackRecommendations } from "@/lib/symptom-recommendations";

describe("buildFallbackRecommendations", () => {
  it("returns relevant products for common cold symptoms", () => {
    const products = [
      {
        id: "1",
        name: "Paracetamol",
        description: "Pain relief and fever reducer",
        category: "Pain Relief",
        price: "3.99",
        imageUrl: null,
      },
      {
        id: "2",
        name: "Vitamin C Boost",
        description: "Immune support supplement",
        category: "Vitamins",
        price: "8.50",
        imageUrl: null,
      },
      {
        id: "3",
        name: "Flu Relief Syrup",
        description: "Relieves cough and blocked nose",
        category: "Flu & Cold",
        price: "12.00",
        imageUrl: null,
      },
    ];

    const result = buildFallbackRecommendations("I have a cold, fever, and blocked nose", products);

    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.recommendations[0].name).toContain("Flu Relief Syrup");
    expect(result.reasoning).toContain("cold");
  });
});
