import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUserOrNull } from "@/lib/auth";
import type { Prisma } from "@/generated/db";
import { rateLimitRequest, RequestSecurityError } from "@/lib/request-security";
import {
  AdminProductListQuerySchema,
  validationMessage,
} from "@/lib/validation";

export const dynamic = "force-dynamic";

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

    // status filtering (note: low stock comparison is computed client-side)
    if (status && status !== "all") {
      if (status === "out") where.quantity = { lte: 0 };
      else if (status === "in") where.quantity = { gt: 0 };
      else if (status === "low") {
        // fetch candidates that have lowStock set and positive quantity; we'll compute exact low-stock client-side
        where.AND = [{ lowStock: { not: null } }, { quantity: { gt: 0 } }];
      }
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

    return NextResponse.json({ products, total, limit, skip });
  } catch (error) {
    console.error(error);
    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Failed to fetch admin products" }, { status: 500 });
  }
}
