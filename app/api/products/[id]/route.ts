import { NextResponse } from "next/server";
import { normalizeDosageGuide } from "@/lib/dosage-guide";
import { prisma } from "@/lib/prisma";
import { rateLimitRequest, RequestSecurityError } from "@/lib/request-security";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    await rateLimitRequest(req, "product:detail", { limit: 120, windowMs: 60_000 });

    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        price: true,
        quantity: true,
        imageUrl: true,
        dosage: true,
        dosageGuide: true,
        manufacturer: true,
        prescriptionRequired: true,
        activeListing: true,
      },
    });

    if (!product || !product.activeListing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...product,
      price: parseFloat(product.price.toString()),
      dosageGuide: normalizeDosageGuide(product.dosageGuide),
    });
  } catch (error) {
    console.error("Failed to fetch product by id", error);

    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}
