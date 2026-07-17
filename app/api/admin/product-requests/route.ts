import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const requests = await prisma.productRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // Also get request counts per product name
    const counts = await prisma.productRequest.groupBy({
      by: ['productName'],
      _count: { productName: true },
      orderBy: { _count: { productName: 'desc' } },
    })

    return NextResponse.json({ requests, counts })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load requests' },
      { status: 500 }
    )
  }
}
