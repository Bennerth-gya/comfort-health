import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, rating, message } = body

    // Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter your name' },
        { status: 400 }
      )
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Please select a rating' },
        { status: 400 }
      )
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please write at least 10 characters' },
        { status: 400 }
      )
    }

    if (message.trim().length > 500) {
      return NextResponse.json(
        { error: 'Review must be under 500 characters' },
        { status: 400 }
      )
    }

    const review = await prisma.customerReview.create({
      data: {
        name: name.trim(),
        rating: parseInt(rating),
        message: message.trim(),
        isApproved: false,
        isRead: false,
      }
    })

    return NextResponse.json(
      { success: true, id: review.id },
      { status: 201 }
    )

  } catch (error) {
    console.error('Review submission error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    // Only return approved reviews for the public
    const reviews = await prisma.customerReview.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        rating: true,
        message: true,
        createdAt: true,
      }
    })

    return NextResponse.json({ reviews })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load reviews' },
      { status: 500 }
    )
  }
}
