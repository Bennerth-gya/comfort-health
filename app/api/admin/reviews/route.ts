import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminUserOrNull } from '@/lib/auth'

// Get all reviews for admin
export async function GET() {
  const admin = await getAdminUserOrNull()
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

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
