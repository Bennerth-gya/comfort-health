import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const bundle = await prisma.bundle.findUnique({
      where: { slug, isActive: true },
      include: {
        items: {
          orderBy: { sortOrder: "asc" },
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                imageUrl: true,
                category: true,
                quantity: true,
                description: true,
                activeListing: true,
              },
            },
          },
        },
      },
    });

    if (!bundle) {
      return NextResponse.json({ error: "Bundle not found" }, { status: 404 });
    }

    return NextResponse.json({
      bundle: {
        id: bundle.id,
        name: bundle.name,
        slug: bundle.slug,
        description: bundle.description,
        imageUrl: bundle.imageUrl,
        price: Number(bundle.price),
        compareAt: bundle.compareAt ? Number(bundle.compareAt) : null,
        isFeatured: bundle.isFeatured,
        category: bundle.category,
        items: bundle.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          product: {
            id: item.product.id,
            name: item.product.name,
            price: Number(item.product.price),
            imageUrl: item.product.imageUrl,
            category: item.product.category,
            description: item.product.description,
            inStock: item.product.quantity > 0 && item.product.activeListing,
          },
        })),
      },
    });
  } catch (error) {
    console.error("Bundle detail fetch error:", error);
    return NextResponse.json({ error: "Failed to load bundle" }, { status: 500 });
  }
}
