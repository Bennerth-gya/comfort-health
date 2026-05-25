import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserOrNull } from "@/lib/auth";

export const dynamic = "force-dynamic";

class ProductValidationError extends Error {}

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function requiredString(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new ProductValidationError(`${field} is required`);
  }
  return value.trim();
}

function requiredNumber(value: unknown, field: string) {
  const number = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(number)) {
    throw new ProductValidationError(`${field} must be a valid number`);
  }
  return number;
}

function optionalNumber(value: unknown, field: string) {
  if (value === null || value === undefined || value === "") return null;
  return requiredNumber(value, field);
}

function optionalDate(value: unknown) {
  if (typeof value !== "string" || !value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new ProductValidationError("Expiry date must be valid");
  }
  return date;
}

function isPrismaError(error: unknown, code: string) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === code
  );
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUserOrNull();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        userId: user.id,
        name: requiredString(body.name, "Product name"),
        description: optionalString(body.description),
        category: optionalString(body.category),
        sku: optionalString(body.sku),
        price: requiredNumber(body.price, "Price"),
        quantity: requiredNumber(body.quantity, "Quantity"),
        lowStock: optionalNumber(body.lowStock, "Low stock alert"),
        dosage: optionalString(body.dosage),
        manufacturer: optionalString(body.manufacturer),
        expiryDate: optionalDate(body.expiryDate),
        imageUrl: optionalString(body.imageUrl),
        prescriptionRequired: Boolean(body.prescriptionRequired),
        activeListing: body.activeListing !== false,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    if (isPrismaError(error, "P2002")) {
      return NextResponse.json(
        { error: "A product with this SKU already exists." },
        { status: 409 }
      );
    }

    if (error instanceof ProductValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : "Failed to create product",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const skip = parseInt(searchParams.get("skip") || "0");

    const products = await prisma.product.findMany({
      where: { activeListing: true },
      orderBy: { createAt: "desc" },
      take: limit,
      skip: skip,
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        price: true,
        quantity: true,
        imageUrl: true,
        manufacturer: true,
        dosage: true,
        prescriptionRequired: true,
        activeListing: true,
      },
    });

    const total = await prisma.product.count({
      where: { activeListing: true },
    });

    return NextResponse.json({
      products: products.map((p) => ({
        ...p,
        price: parseFloat(p.price.toString()),
      })),
      total,
      limit,
      skip,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}