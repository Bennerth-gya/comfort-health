import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, productName, reason } = body

    // Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter your name' },
        { status: 400 }
      )
    }

    if (!productName || productName.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter the medicine name' },
        { status: 400 }
      )
    }

    if (productName.trim().length > 100) {
      return NextResponse.json(
        { error: 'Medicine name is too long' },
        { status: 400 }
      )
    }

    // Check if same product was already requested recently
    // Prevents spam submissions of the same item
    const existing = await prisma.productRequest.findFirst({
      where: {
        productName: {
          equals: productName.trim(),
          mode: 'insensitive'
        },
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // last 24 hours
        }
      }
    })

    if (existing) {
      // Still return success so user does not feel rejected
      // but do not create a duplicate in the database
      return NextResponse.json(
        { 
          success: true, 
          message: 'Thank you! This product has already been requested.' 
        },
        { status: 200 }
      )
    }

    const request = await prisma.productRequest.create({
      data: {
        name: name.trim(),
        productName: productName.trim(),
        reason: reason?.trim() || null,
        status: 'PENDING',
        isRead: false,
      }
    })

    return NextResponse.json(
      { success: true, id: request.id },
      { status: 201 }
    )

  } catch (error) {
    console.error('Product request error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Most requested products for admin
    const requests = await prisma.productRequest.groupBy({
      by: ['productName'],
      _count: { productName: true },
      orderBy: { _count: { productName: 'desc' } },
      take: 20,
    })

    return NextResponse.json({ requests })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load requests' },
      { status: 500 }
    )
  }
}
