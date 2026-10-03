import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") ?? undefined;
    const featuredOnly = searchParams.get("featured") === "true";

    const bundles = await prisma.bundle.findMany({
      where: {
        isActive: true,
        ...(category ? { category } : {}),
        ...(featuredOnly ? { isFeatured: true } : {}),
      },
      orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
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
                activeListing: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        bundles: bundles.map((b) => ({
          id: b.id,
          name: b.name,
          slug: b.slug,
          description: b.description,
          imageUrl: b.imageUrl,
          price: Number(b.price),
          compareAt: b.compareAt ? Number(b.compareAt) : null,
          isActive: b.isActive,
          isFeatured: b.isFeatured,
          category: b.category,
          items: b.items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            product: {
              id: item.product.id,
              name: item.product.name,
              price: Number(item.product.price),
              imageUrl: item.product.imageUrl,
              category: item.product.category,
              inStock: item.product.quantity > 0 && item.product.activeListing,
            },
          })),
        })),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Bundles fetch error:", error);
    return NextResponse.json({ error: "Failed to load bundles" }, { status: 500 });
  }
}
