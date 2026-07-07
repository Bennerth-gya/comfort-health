import { NextResponse } from "next/server";
import { rateLimitRequest, RequestSecurityError } from "@/lib/request-security";
import {
  searchShopProducts,
} from "@/lib/shop-products";
import {
  PublicProductListQuerySchema,
  validationMessage,
} from "@/lib/validation";

export const dynamic = "force-dynamic";

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

    const { limit, skip, q } = parsedQuery.data;

    const { products, total } = await searchShopProducts({ q, limit, skip });

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
