import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminUserOrNull } from '@/lib/auth'

export async function GET() {
  const admin = await getAdminUserOrNull()
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

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
