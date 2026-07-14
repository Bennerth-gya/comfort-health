import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimitRequest, RequestSecurityError } from "@/lib/request-security";

export const revalidate = 60;
export async function GET(request: Request) {
  try {
    await rateLimitRequest(request, "product:public", { limit: 120, windowMs: 60_000 });

    const products = await prisma.product.findMany({
      where: {
        activeListing: true,
      },
      orderBy: {
        createAt: "desc",
      },
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
