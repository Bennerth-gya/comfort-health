import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserOrNull } from "@/lib/auth";

export const dynamic = "force-dynamic";

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function optionalNumber(value: unknown) {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return null;
  return n;
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUserOrNull();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (product.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUserOrNull();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const data: any = {};
    if (body.name !== undefined) data.name = optionalString(body.name) ?? existing.name;
    if (body.description !== undefined) data.description = optionalString(body.description);
    if (body.category !== undefined) data.category = optionalString(body.category);
    if (body.sku !== undefined) data.sku = optionalString(body.sku);
    if (body.price !== undefined) data.price = optionalNumber(body.price) ?? existing.price;
    if (body.quantity !== undefined) data.quantity = optionalNumber(body.quantity) ?? existing.quantity;
    if (body.lowStock !== undefined) data.lowStock = optionalNumber(body.lowStock);
    if (body.dosage !== undefined) data.dosage = optionalString(body.dosage);
    if (body.manufacturer !== undefined) data.manufacturer = optionalString(body.manufacturer);
    if (body.imageUrl !== undefined) data.imageUrl = optionalString(body.imageUrl);
    if (body.prescriptionRequired !== undefined) data.prescriptionRequired = Boolean(body.prescriptionRequired);
    if (body.activeListing !== undefined) data.activeListing = Boolean(body.activeListing);

    const updated = await prisma.product.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUserOrNull();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // Soft delete: mark activeListing false
    const deleted = await prisma.product.update({ where: { id }, data: { activeListing: false } });
    return NextResponse.json({ success: true, product: deleted });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
