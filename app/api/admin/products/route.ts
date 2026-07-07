import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUserOrNull } from "@/lib/auth";
import { Prisma } from "@/generated/db";
import { normalizeDosageGuide } from "@/lib/dosage-guide";
import {
  assertJsonContentType,
  assertSameOrigin,
  rateLimitRequest,
  readJsonRequest,
  RequestSecurityError,
} from "@/lib/request-security";
import {
  AdminProductListQuerySchema,
  ProductCreateSchema,
  validationMessage,
} from "@/lib/validation";

export const dynamic = "force-dynamic";

class ProductValidationError extends Error {}

function isPrismaError(error: unknown, code: string) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === code
  );
}

function databaseTimeoutResponse(error: unknown, message: string) {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
      ? error.code
      : null;

  if (code === "ETIMEDOUT" || code === "P1001" || code === "P2024") {
    return NextResponse.json({ error: message }, { status: 503 });
  }

  return null;
}

export async function GET(req: Request) {
  try {
    await rateLimitRequest(req, "admin-product:list", { limit: 120, windowMs: 60_000 });

    const user = await getAdminUserOrNull();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const parsedQuery = AdminProductListQuerySchema.safeParse(
      Object.fromEntries(searchParams),
    );

    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: validationMessage(parsedQuery.error) },
        { status: 400 },
      );
    }

    const {
      q,
      category,
      brand,
      status,
      minPrice,
      maxPrice,
      limit,
      skip,
    } = parsedQuery.data;

    const where: Prisma.ProductWhereInput = { userId: user.id };

    if (q) {
      const like = { contains: q, mode: "insensitive" } as const;
      where.OR = [
        { name: like },
        { description: like },
        { sku: like },
        { manufacturer: like },
      ];
    }

    if (category) where.category = category;
    if (brand) where.manufacturer = brand;

    if (typeof minPrice === "number" || typeof maxPrice === "number") {
      where.price = {};
      if (typeof minPrice === "number") where.price.gte = minPrice;
      if (typeof maxPrice === "number") where.price.lte = maxPrice;
    }

    const andFilters: Prisma.ProductWhereInput[] = Array.isArray(where.AND)
      ? where.AND
      : where.AND
        ? [where.AND]
        : [];

    if (status && status !== "all") {
      if (status === "out") where.quantity = { lte: 0 };
      else if (status === "in") {
        where.quantity = { gt: 0 };
        andFilters.push({
          OR: [
            { lowStock: null },
            { quantity: { gt: prisma.product.fields.lowStock } },
          ],
        });
      }
      else if (status === "low") {
        andFilters.push(
          { lowStock: { not: null } },
          {
            quantity: {
              gt: 0,
              lte: prisma.product.fields.lowStock,
            },
          },
        );
      }
    }

    if (andFilters.length > 0) {
      where.AND = andFilters;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createAt: "desc" },
        take: limit,
        skip,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products: products.map((product) => ({
        ...product,
        dosageGuide: normalizeDosageGuide(product.dosageGuide),
      })),
      total,
      limit,
      skip,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const timeout = databaseTimeoutResponse(
      error,
      "Database connection timed out. Check DATABASE_URL and try again in a few seconds.",
    );
    if (timeout) {
      return timeout;
    }

    return NextResponse.json({ error: "Failed to fetch admin products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    assertJsonContentType(req);
    await rateLimitRequest(req, "admin-product:create", { limit: 20, windowMs: 60_000 });

    const user = await getAdminUserOrNull();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const parsed = ProductCreateSchema.safeParse(
      await readJsonRequest(req, 1_250_000),
    );
    if (!parsed.success) {
      throw new ProductValidationError(validationMessage(parsed.error));
    }

    const { dosageGuide, ...productData } = parsed.data;
    const product = await prisma.product.create({
      data: {
        userId: user.id,
        ...productData,
        dosageGuide: dosageGuide ?? Prisma.DbNull,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    if (isPrismaError(error, "P2002")) {
      return NextResponse.json(
        { error: "A product with this SKU already exists." },
        { status: 409 },
      );
    }

    if (error instanceof ProductValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const timeout = databaseTimeoutResponse(
      error,
      "Database connection timed out. Please try again in a few seconds.",
    );
    if (timeout) {
      return timeout;
    }

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : "Failed to create product",
      },
      { status: 500 },
    );
  }
}
