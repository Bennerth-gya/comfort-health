import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/support/conversations/[id]'>
) {
  const { id } = await ctx.params

  try {
    const conversation = await prisma.supportConversation.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
    }

    // Mark student messages as read when pharmacist opens conversation
    await prisma.supportMessage.updateMany({
      where: {
        conversationId: id,
        senderType: 'STUDENT',
        isRead: false,
      },
      data: { isRead: true },
    })

    return NextResponse.json(conversation)
  } catch (error) {
    console.error('GET /api/support/conversations/[id] error:', error)
    return NextResponse.json({ error: 'Failed to load conversation' }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<'/api/support/conversations/[id]'>
) {
  const { id } = await ctx.params

  try {
    const body = await req.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ error: 'status is required' }, { status: 400 })
    }

    const updated = await prisma.supportConversation.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('PATCH /api/support/conversations/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update conversation' }, { status: 500 })
  }
}
