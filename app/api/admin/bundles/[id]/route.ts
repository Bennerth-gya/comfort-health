import "server-only";
import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// PUT /api/admin/bundles/[id] — update a bundle
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminUser();
    const { id } = await params;
    const body = (await req.json()) as Record<string, unknown>;

    const data: Record<string, unknown> = {};
    if (typeof body.name === "string") data.name = body.name.trim();
    if (typeof body.slug === "string") data.slug = body.slug.trim();
    if (typeof body.description === "string") data.description = body.description.trim() || null;
    if (typeof body.imageUrl === "string") data.imageUrl = body.imageUrl.trim() || null;
    if (body.price != null) data.price = Number(body.price);
    if (body.compareAt !== undefined) data.compareAt = body.compareAt != null ? Number(body.compareAt) : null;
    if (typeof body.isActive === "boolean") data.isActive = body.isActive;
    if (typeof body.isFeatured === "boolean") data.isFeatured = body.isFeatured;
    if (typeof body.sortOrder === "number") data.sortOrder = body.sortOrder;
    if (typeof body.category === "string") data.category = body.category.trim() || null;

    const bundle = await prisma.bundle.update({ where: { id }, data });
    return NextResponse.json({ bundle });
  } catch (error) {
    console.error("Admin bundle PUT error:", error);
    return NextResponse.json({ error: "Failed to update bundle" }, { status: 500 });
  }
}

// DELETE /api/admin/bundles/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminUser();
    const { id } = await params;
    await prisma.bundle.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin bundle DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete bundle" }, { status: 500 });
  }
}

// POST /api/admin/bundles/[id] — add/replace items in a bundle
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminUser();
    const { id } = await params;
    const body = (await req.json()) as { items: Array<{ productId: string; quantity: number; sortOrder?: number }> };

    if (!Array.isArray(body.items)) {
      return NextResponse.json({ error: "items array required" }, { status: 400 });
    }

    // Replace all items atomically
    await prisma.$transaction([
      prisma.bundleItem.deleteMany({ where: { bundleId: id } }),
      prisma.bundleItem.createMany({
        data: body.items.map((item, i) => ({
          bundleId: id,
          productId: item.productId,
          quantity: Math.max(1, item.quantity ?? 1),
          sortOrder: item.sortOrder ?? i,
        })),
      }),
    ]);

    const bundle = await prisma.bundle.findUnique({
      where: { id },
      include: { items: { include: { product: { select: { id: true, name: true, price: true } } } } },
    });

    return NextResponse.json({ bundle });
  } catch (error) {
    console.error("Admin bundle items POST error:", error);
    return NextResponse.json({ error: "Failed to update bundle items" }, { status: 500 });
  }
}
