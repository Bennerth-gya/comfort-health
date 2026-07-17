import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Get all reviews for admin
export async function GET() {
  try {
    const reviews = await prisma.customerReview.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ reviews })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load reviews' },
      { status: 500 }
    )
  }
}
