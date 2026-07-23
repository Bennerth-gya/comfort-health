import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminUserOrNull } from '@/lib/auth'

export async function GET() {
  const admin = await getAdminUserOrNull()
  if (!admin) {
    return NextResponse.json({ reviews: 0, requests: 0 }, { status: 403 })
  }

  try {
    const reviewsCount = await prisma.customerReview.count({
      where: { isRead: false },
    })
    
    const requestsCount = await prisma.productRequest.count({
      where: { isRead: false },
    })

    return NextResponse.json({ reviews: reviewsCount, requests: requestsCount })
  } catch (error) {
    console.error('Failed to get unread counts:', error)
    return NextResponse.json({ reviews: 0, requests: 0 }, { status: 500 })
  }
}
