import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = (searchParams.get('q') ?? '').trim()

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
        ],
        quantity: { gt: 0 },
        activeListing: true,
      },
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
        category: true,
        description: true,
      },
      take: 10,
    })

    return NextResponse.json(
      products.map((p) => ({ ...p, price: parseFloat(p.price.toString()) }))
    )
  } catch (error) {
    console.error('GET /api/support/products/search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
