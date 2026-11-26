import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notifyNewProductRequest } from '@/lib/notifications'
import { rateLimitRequest, RequestSecurityError } from '@/lib/request-security'

export async function POST(req: NextRequest) {
  try {
    // This endpoint now sends paid SMS alerts; limit repeat submissions per client.
    await rateLimitRequest(req, 'product-request:create', { limit: 5, windowMs: 10 * 60_000 })

    const body = await req.json()
    const { name, productName, reason } = body

    // Validation
    if (typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter your name' },
        { status: 400 }
      )
    }

    if (name.trim().length > 50) {
      return NextResponse.json(
        { error: 'Name is too long' },
        { status: 400 }
      )
    }

    if (typeof productName !== 'string' || productName.trim().length < 2) {
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

    if (reason != null && (typeof reason !== 'string' || reason.trim().length > 300)) {
      return NextResponse.json(
        { error: 'Please keep your note under 300 characters' },
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
        reason: typeof reason === 'string' ? reason.trim() || null : null,
        status: 'PENDING',
        isRead: false,
      }
    })

    // Keep the saved request even if the SMS provider is temporarily unavailable.
    try {
      await notifyNewProductRequest(request)
    } catch (notificationError) {
      console.error('Product request SMS notification failed:', notificationError)
    }

    return NextResponse.json(
      { success: true, id: request.id },
      { status: 201 }
    )

  } catch (error) {
    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
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
