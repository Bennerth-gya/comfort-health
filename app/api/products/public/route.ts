import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimitRequest, RequestSecurityError } from "@/lib/request-security";

// Publicly cacheable — no user-specific data.
export async function GET(request: Request) {
  try {
    await rateLimitRequest(request, "product:public", { limit: 120, windowMs: 60_000 });

    const products = await prisma.product.findMany({
      where: {
        activeListing: true,
      },
      orderBy: [
        { price: "asc" },
        { createAt: "desc" },
      ],
      take: 100,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        quantity: true,
        category: true,
        imageUrl: true,
        dosage: true,
        manufacturer: true,
        prescriptionRequired: true,
        activeListing: true,
      },
    });

    return NextResponse.json(
      products.map((product) => ({
        ...product,
        price: product.price.toString(),
      })),
      {
        headers: {
          // 5-min CDN edge cache, 24-h stale-while-revalidate
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch public products", error);

    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
