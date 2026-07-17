import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      conversationId,
      content,
      senderType,
      senderName,
      messageType,
      productId,
      productName,
      productPrice,
      productImage,
    } = body

    if (!conversationId || !content?.trim() || !senderType || !senderName) {
      return NextResponse.json(
        { error: 'conversationId, content, senderType, and senderName are required' },
        { status: 400 }
      )
    }

    // If pharmacist is sending, upgrade conversation status to ACTIVE
    const updateData: {
      lastMessageAt: Date
      status?: 'WAITING' | 'ACTIVE' | 'RESOLVED' | 'CLOSED'
      pharmacistId?: string
    } = {
      lastMessageAt: new Date(),
    }
    if (senderType === 'PHARMACIST') {
      updateData.status = 'ACTIVE'
      updateData.pharmacistId = 'pharmacist'
    }

    const [message] = await prisma.$transaction([
      prisma.supportMessage.create({
        data: {
          conversationId,
          content: content.trim(),
          senderType,
          senderName,
          messageType: messageType ?? 'TEXT',
          productId: productId ?? null,
          productName: productName ?? null,
          productPrice: productPrice ?? null,
          productImage: productImage ?? null,
        },
      }),
      prisma.supportConversation.update({
        where: { id: conversationId },
        data: updateData,
      }),
    ])

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('POST /api/support/messages error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
