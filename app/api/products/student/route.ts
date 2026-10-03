import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const collection = searchParams.get("collection") ?? undefined;
  const limit = Math.min(Number(searchParams.get("limit") ?? "20"), 48);

  try {
    const products = await prisma.product.findMany({
      where: {
        activeListing: true,
        ...(collection ? { studentCollection: collection } : { studentCollection: { not: null } }),
      },
      orderBy: [{ isFeatured: "desc" }, { createAt: "desc" }],
      take: limit,
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
        category: true,
        quantity: true,
        prescriptionRequired: true,
        studentCollection: true,
        isFeatured: true,
      },
    });

    return NextResponse.json({
      products: products.map((p) => ({
        ...p,
        price: Number(p.price),
      })),
    });
  } catch (error) {
    console.error("Student products fetch error:", error);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
