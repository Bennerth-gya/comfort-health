import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUserOrNull } from "@/lib/auth";
import { Prisma } from "@/generated/db";
import { normalizeDosageGuide } from "@/lib/dosage-guide";
import {
  assertJsonContentType,
  assertSameOrigin,
  rateLimitRequest,
  readJsonRequest,
  RequestSecurityError,
} from "@/lib/request-security";
import { ProductUpdateSchema, validationMessage } from "@/lib/validation";

export const dynamic = "force-dynamic";

class ProductValidationError extends Error {}

function hasOwn(object: object, key: PropertyKey) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function isPrismaError(error: unknown, code: string) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === code
  );
}

function productError(error: unknown, fallback: string) {
  console.error(error);

  if (error instanceof ProductValidationError || error instanceof RequestSecurityError) {
    return NextResponse.json({ error: error.message }, { status: error instanceof RequestSecurityError ? error.status : 400 });
  }

  if (isPrismaError(error, "P2002")) {
    return NextResponse.json(
      { error: "A product with this SKU already exists." },
      { status: 409 },
    );
  }

  return NextResponse.json({ error: fallback }, { status: 500 });
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getAdminUserOrNull();
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    await rateLimitRequest(req, "product:admin-detail", { limit: 120, windowMs: 60_000 });

    const product = await prisma.product.findFirst({ where: { id, userId: user.id } });
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      ...product,
      dosageGuide: normalizeDosageGuide(product.dosageGuide),
    });
  } catch (err) {
    console.error(err);
    if (err instanceof RequestSecurityError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getAdminUserOrNull();
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    assertSameOrigin(req);
    assertJsonContentType(req);
    await rateLimitRequest(req, "product:update", { limit: 60, windowMs: 60_000 });

    const parsed = ProductUpdateSchema.safeParse(
      await readJsonRequest(req, 1_250_000),
    );
    if (!parsed.success) {
      throw new ProductValidationError(validationMessage(parsed.error));
    }

    const { dosageGuide, ...parsedData } = parsed.data;
    const data: Prisma.ProductUpdateManyMutationInput = { ...parsedData };
    if (hasOwn(parsed.data, "dosageGuide")) {
      data.dosageGuide = dosageGuide ?? Prisma.DbNull;
    }

    const claim = await prisma.product.updateMany({
      where: { id, userId: user.id },
      data,
    });

    if (claim.count !== 1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updated = await prisma.product.findUnique({ where: { id } });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({
      ...updated,
      dosageGuide: normalizeDosageGuide(updated.dosageGuide),
    });
  } catch (error) {
    return productError(error, "Failed to update product");
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getAdminUserOrNull();
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    assertSameOrigin(req);
    await rateLimitRequest(req, "product:delete", { limit: 40, windowMs: 60_000 });

    const claim = await prisma.product.updateMany({
      where: { id, userId: user.id },
      data: { activeListing: false },
    });

    if (claim.count !== 1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const deleted = await prisma.product.findUnique({ where: { id } });
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({
      success: true,
      product: {
        ...deleted,
        dosageGuide: normalizeDosageGuide(deleted.dosageGuide),
      },
    });
  } catch (error) {
    return productError(error, "Failed to delete product");
  }
}
