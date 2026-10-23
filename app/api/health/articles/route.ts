import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Articles are publicly cacheable at the CDN — no user-specific data.
// Remove force-dynamic so s-maxage is respected by Vercel/CDN.

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '20')

    const articles = await prisma.healthArticle.findMany({
      where: {
        isPublished: true,
        ...(category &&
          category !== 'all' && {
            category: {
              equals: category,
              mode: 'insensitive',
            },
          }),
        ...(featured === 'true' && { isFeatured: true }),
      },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        excerpt: true,
        coverImage: true,
        readTime: true,
        author: true,
        isFeatured: true,
        views: true,
        tags: true,
        createdAt: true,
      },
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      take: limit,
    })

    return NextResponse.json(
      { articles },
      {
        headers: {
          // 10-min CDN edge cache, stale-while-revalidate for 24 h
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
        },
      },
    )
  } catch (error) {
    console.error('Error fetching health articles:', error)
    return NextResponse.json(
      { error: 'Failed to load articles' },
      { status: 500 },
    )
  }
}
