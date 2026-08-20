import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUserOrNull } from "@/lib/auth";
import { normalizeHealthArticleCoverImage } from "@/lib/health-article-cover-image";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getAdminUserOrNull();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const articles = await prisma.healthArticle.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching admin health articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAdminUserOrNull();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      category,
      excerpt,
      content,
      coverImage,
      readTime,
      author,
      isPublished,
      isFeatured,
      tags,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    let normalizedCoverImage: string | null;
    try {
      normalizedCoverImage = normalizeHealthArticleCoverImage(coverImage);
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

    const finalSlug = (slug?.trim() || title.trim())
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    const existing = await prisma.healthArticle.findUnique({
      where: { slug: finalSlug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An article with this URL slug already exists." },
        { status: 400 }
      );
    }

    const article = await prisma.healthArticle.create({
      data: {
        title: title.trim(),
        slug: finalSlug,
        category: category || "General Health",
        excerpt: excerpt?.trim() || "",
        content: content?.trim() || "",
        coverImage: normalizedCoverImage,
        readTime: readTime || "5 min read",
        author: author || "Comfort Health Team",
        isPublished: isPublished ?? false,
        isFeatured: isFeatured ?? false,
        tags: Array.isArray(tags) ? tags : [],
      },
    });

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error) {
    console.error("Create article error:", error);
    return NextResponse.json(
      { error: "Failed to save article." },
      { status: 500 }
    );
  }
}
