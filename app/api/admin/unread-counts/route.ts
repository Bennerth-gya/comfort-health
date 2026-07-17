import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
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
