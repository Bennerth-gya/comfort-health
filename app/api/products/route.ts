import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUserOrNull } from "@/lib/auth";
import {
  assertJsonContentType,
  assertSameOrigin,
  rateLimitRequest,
  readJsonRequest,
  RequestSecurityError,
} from "@/lib/request-security";
import {
  ProductCreateSchema,
  PublicProductListQuerySchema,
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

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    assertJsonContentType(req);
    await rateLimitRequest(req, "product:create", { limit: 20, windowMs: 60_000 });

    const user = await getAdminUserOrNull();

    if (!user) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const parsed = ProductCreateSchema.safeParse(
      await readJsonRequest(req, 1_250_000),
    );
    if (!parsed.success) {
      throw new ProductValidationError(validationMessage(parsed.error));
    }

    const product = await prisma.product.create({
      data: {
        userId: user.id,
        ...parsed.data,
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

    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const code =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "string"
        ? error.code
        : null;

    if (code === "ETIMEDOUT" || code === "P1001" || code === "P2024") {
      return NextResponse.json(
        { error: "Database connection timed out. Please try again in a few seconds." },
        { status: 503 },
      );
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
    await rateLimitRequest(req, "product:list", { limit: 120, windowMs: 60_000 });

    const { searchParams } = new URL(req.url);
    const parsedQuery = PublicProductListQuerySchema.safeParse(
      Object.fromEntries(searchParams),
    );

    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: validationMessage(parsedQuery.error) },
        { status: 400 },
      );
    }

    const { limit, skip } = parsedQuery.data;

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
        isFeatured: true,
        featuredRank: true,
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
    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const code =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "string"
        ? error.code
        : null;

    if (code === "ETIMEDOUT" || code === "P1001" || code === "P2024") {
      return NextResponse.json(
        { error: "Database connection timed out. Please try again in a few seconds." },
        { status: 503 },
      );
    }

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
