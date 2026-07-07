import { describe, expect, it } from "vitest";
import { filterInventoryLocally } from "@/components/inventory/InventoryClient";
import type { Product } from "@/components/inventory/InventoryClient";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Paracetamol",
    sku: "PARA123",
    category: "Pain Relief",
    price: 10.5,
    quantity: 15,
    lowStock: 5,
    manufacturer: "GSK",
    description: "Painkiller medication",
  },
  {
    id: "2",
    name: "Aspirin",
    sku: "ASP999",
    category: "Pain Relief",
    price: 15.0,
    quantity: 3,
    lowStock: 5,
    manufacturer: "Bayer",
    description: "Heart aspirin tablets",
  },
  {
    id: "3",
    name: "Multivitamin",
    sku: "MULTI55",
    category: "Vitamins & Supplements",
    price: 25.0,
    quantity: 0,
    lowStock: 2,
    manufacturer: "NatureMade",
    description: "Daily multivitamin gummies",
  },
  {
    id: "4",
    name: "Amoxicillin",
    sku: "AMOX200",
    category: "Antibiotics",
    price: 45.0,
    quantity: 50,
    lowStock: 10,
    manufacturer: "Sandoz",
    description: "Oral antibiotic capsule",
  },
];

describe("Inventory local filtering & search scoring", () => {
  it("returns all products when no query or filter is active", () => {
    const result = filterInventoryLocally(mockProducts, "", null, null, null, null);
    expect(result.length).toBe(mockProducts.length);
  });

  it("scores and ranks exact query match highest", () => {
    const result = filterInventoryLocally(mockProducts, "aspirin", null, null, null, null);
    expect(result[0].id).toBe("2");
  });

  it("matches SKU correctly", () => {
    const result = filterInventoryLocally(mockProducts, "ASP999", null, null, null, null);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Aspirin");
  });

  it("matches manufacturer correctly", () => {
    const result = filterInventoryLocally(mockProducts, "Sandoz", null, null, null, null);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Amoxicillin");
  });

  it("filters by category correctly", () => {
    const result = filterInventoryLocally(mockProducts, "", "Pain Relief", null, null, null);
    expect(result.length).toBe(2);
    expect(result.map((p) => p.name)).toContain("Paracetamol");
    expect(result.map((p) => p.name)).toContain("Aspirin");
  });

  it("filters by status correctly (out of stock)", () => {
    const result = filterInventoryLocally(mockProducts, "", null, "out", null, null);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Multivitamin");
  });

  it("filters by status correctly (low stock)", () => {
    const result = filterInventoryLocally(mockProducts, "", null, "low", null, null);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Aspirin");
  });

  it("filters by status correctly (in stock)", () => {
    const result = filterInventoryLocally(mockProducts, "", null, "in", null, null);
    expect(result.length).toBe(2);
    expect(result.map((p) => p.name)).toContain("Paracetamol");
    expect(result.map((p) => p.name)).toContain("Amoxicillin");
  });

  it("filters by price range (minPrice)", () => {
    const result = filterInventoryLocally(mockProducts, "", null, null, 20.0, null);
    expect(result.length).toBe(2);
    expect(result.map((p) => p.name)).toContain("Multivitamin");
    expect(result.map((p) => p.name)).toContain("Amoxicillin");
  });

  it("filters by price range (maxPrice)", () => {
    const result = filterInventoryLocally(mockProducts, "", null, null, null, 12.0);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Paracetamol");
  });
});
