import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserOrNull } from "@/lib/auth";

export const dynamic = "force-dynamic";

function parseNumber(v: string | null) {
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUserOrNull();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const status = searchParams.get("status"); // in, low, out, all
    const minPrice = parseNumber(searchParams.get("minPrice"));
    const maxPrice = parseNumber(searchParams.get("maxPrice"));
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    const where: any = { userId: user.id };

    if (q) {
      const like = { contains: q, mode: "insensitive" };
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
        take: Math.min(limit, 200),
        skip: Math.max(0, skip),
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ products, total, limit, skip });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch admin products" }, { status: 500 });
  }
}
