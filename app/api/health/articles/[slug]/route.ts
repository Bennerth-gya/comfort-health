import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params

    const article = await prisma.healthArticle.findUnique({
      where: {
        slug,
        isPublished: true,
      },
    })

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    // Increment view count (fire-and-forget, don't block the response)
    prisma.healthArticle
      .update({
        where: { id: article.id },
        data: { views: { increment: 1 } },
      })
      .catch(() => {/* silently ignore view-count failures */})

    return NextResponse.json({ article })
  } catch (error) {
    console.error('Error fetching health article:', error)
    return NextResponse.json(
      { error: 'Failed to load article' },
      { status: 500 },
    )
  }
}
