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
import { HeroSlideCreateSchema, validationMessage } from "@/lib/validation";
import type { Prisma } from "@/generated/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await rateLimitRequest(req, "admin-hero-slide:list", { limit: 120, windowMs: 60_000 });

    const user = await getAdminUserOrNull();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const slides = await prisma.heroSlide.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ slides });
  } catch (error) {
    console.error(error);
    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Failed to fetch hero slides" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    assertSameOrigin(req);
    assertJsonContentType(req);
    await rateLimitRequest(req, "admin-hero-slide:create", { limit: 20, windowMs: 60_000 });

    const user = await getAdminUserOrNull();
    if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const parsed = HeroSlideCreateSchema.safeParse(await readJsonRequest(req, 1_250_000));
    if (!parsed.success) {
      return NextResponse.json({ error: validationMessage(parsed.error) }, { status: 400 });
    }

    // Prisma expects a non-null `imageUrl` string; our schema guarantees it.
    const slide = await prisma.heroSlide.create({ data: parsed.data as Prisma.HeroSlideCreateInput });
    return NextResponse.json(slide);
  } catch (error) {
    console.error(error);
    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json({ error: "Failed to create hero slide" }, { status: 500 });
  }
}
