import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        activeListing: true,
      },
      orderBy: {
        createAt: "desc",
      },
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

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
