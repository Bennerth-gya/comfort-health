import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminUserOrNull } from "@/lib/auth";
import { normalizeHealthArticleCoverImage } from "@/lib/health-article-cover-image";
import { deleteHealthImage } from "@/lib/storage";
import {
  assertSameOrigin,
  rateLimitRequest,
  RequestSecurityError,
} from "@/lib/request-security";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAdminUserOrNull();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const article = await prisma.healthArticle.findUnique({ where: { id } });

    if (!article) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAdminUserOrNull();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    let normalizedCoverImage: string | null;
    try {
      normalizedCoverImage = normalizeHealthArticleCoverImage(body.coverImage);
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Cover image URL is invalid.",
        },
        { status: 400 }
      );
    }

    const updated = await prisma.healthArticle.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        category: body.category,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: normalizedCoverImage,
        readTime: body.readTime,
        author: body.author,
        isPublished: body.isPublished,
        isFeatured: body.isFeatured,
      },
    });

    return NextResponse.json({ article: updated });
  } catch (error) {
    console.error("Failed to update article", error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    assertSameOrigin(req);
    await rateLimitRequest(req, "admin-health-article:delete", {
      limit: 40,
      windowMs: 60_000,
    });

    const user = await getAdminUserOrNull();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const article = await prisma.healthArticle.findUnique({
      where: { id },
      select: {
        id: true,
        slug: true,
        coverImage: true,
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const deleted = await prisma.healthArticle.deleteMany({
      where: { id },
    });

    if (deleted.count !== 1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (article.coverImage) {
      await deleteHealthImage(article.coverImage);
    }

    revalidatePath("/admin/health");
    revalidatePath("/health");
    revalidatePath(`/health/${article.slug}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete article", error);

    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
