import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUserOrNull } from "@/lib/auth";
import {
  assertJsonContentType,
  assertSameOrigin,
  rateLimitRequest,
  readJsonRequest,
  RequestSecurityError,
} from "@/lib/request-security";
import { HeroSlideUpdateSchema, validationMessage } from "@/lib/validation";
import type { Prisma } from "@/generated/db";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    assertSameOrigin(req);
    assertJsonContentType(req);
    await rateLimitRequest(req, "admin-hero-slide:update", { limit: 60, windowMs: 60_000 });

    const user = await getAdminUserOrNull();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const parsed = HeroSlideUpdateSchema.safeParse(await readJsonRequest(req, 1_250_000));
    if (!parsed.success) {
      return NextResponse.json({ error: validationMessage(parsed.error) }, { status: 400 });
    }

    // Ensure we don't pass `null` for `imageUrl` to Prisma; our update schema
    // coerces null to undefined where appropriate.
    const updated = await prisma.heroSlide.updateMany({
      where: { id },
      data: parsed.data as Prisma.HeroSlideUpdateManyMutationInput,
    });

    if (updated.count !== 1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const slide = await prisma.heroSlide.findUnique({ where: { id } });
    if (!slide) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(slide);
  } catch (error) {
    console.error(error);
    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Failed to update hero slide" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    assertSameOrigin(req);
    await rateLimitRequest(req, "admin-hero-slide:delete", { limit: 40, windowMs: 60_000 });

    const user = await getAdminUserOrNull();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const deleted = await prisma.heroSlide.updateMany({
      where: { id },
      data: { active: false },
    });

    if (deleted.count !== 1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Failed to delete hero slide" }, { status: 500 });
  }
}
