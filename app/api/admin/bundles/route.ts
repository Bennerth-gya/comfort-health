import "server-only";
import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/admin/bundles — list all bundles for admin
export async function GET() {
  try {
    await requireAdminUser();
    const bundles = await prisma.bundle.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: {
        items: {
          orderBy: { sortOrder: "asc" },
          include: {
            product: {
              select: { id: true, name: true, price: true, imageUrl: true, quantity: true },
            },
          },
        },
      },
    });
    return NextResponse.json({ bundles });
  } catch (error) {
    console.error("Admin bundles GET error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// POST /api/admin/bundles — create a bundle
export async function POST(req: Request) {
  try {
    await requireAdminUser();
    const body = (await req.json()) as Record<string, unknown>;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : null;
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : null;
    const price = Number(body.price ?? 0);
    const compareAt = body.compareAt != null ? Number(body.compareAt) : null;
    const isActive = body.isActive !== false;
    const isFeatured = body.isFeatured === true;
    const sortOrder = typeof body.sortOrder === "number" ? body.sortOrder : 0;
    const category = typeof body.category === "string" ? body.category.trim() : null;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }
    if (isNaN(price) || price <= 0) {
      return NextResponse.json({ error: "Valid price is required" }, { status: 400 });
    }

    const bundle = await prisma.bundle.create({
      data: { name, slug, description, imageUrl, price, compareAt, isActive, isFeatured, sortOrder, category },
    });

    return NextResponse.json({ bundle }, { status: 201 });
  } catch (error: unknown) {
    const e = error as { code?: string };
    if (e?.code === "P2002") {
      return NextResponse.json({ error: "A bundle with this slug already exists" }, { status: 409 });
    }
    console.error("Admin bundles POST error:", error);
    return NextResponse.json({ error: "Failed to create bundle" }, { status: 500 });
  }
}
