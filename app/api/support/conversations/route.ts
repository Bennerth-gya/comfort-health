import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWhatsAppNotification } from '@/lib/whatsapp'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const limit = Math.min(Number(searchParams.get('limit') ?? '50'), 100)

  try {
    const conversations = await prisma.supportConversation.findMany({
      where: status ? { status: status as never } : {},
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: {
            messages: {
              where: { isRead: false, senderType: 'STUDENT' },
            },
          },
        },
      },
      orderBy: { lastMessageAt: 'desc' },
      take: limit,
    })

    return NextResponse.json(conversations)
  } catch (error) {
    console.error('GET /api/support/conversations error:', error)
    return NextResponse.json({ error: 'Failed to load conversations' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { guestName, guestPhone, subject, firstMessage } = body

    if (!guestName?.trim() || !firstMessage?.trim()) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      )
    }

    const conversation = await prisma.supportConversation.create({
      data: {
        guestName: guestName.trim(),
        guestPhone: guestPhone?.trim() || null,
        subject: subject?.trim() || 'Health consultation',
        status: 'WAITING',
        messages: {
          create: {
            content: firstMessage.trim(),
            senderType: 'STUDENT',
            senderName: guestName.trim(),
            messageType: 'TEXT',
          },
        },
      },
      include: { messages: true },
    })

    // Fire WhatsApp notification (non-blocking)
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? 'https://comfort-health-wrts.vercel.app'

    const whatsappMessage =
      `💬 NEW CONSULTATION — Comfort Health\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 Student: ${guestName}\n` +
      `📞 Phone: ${guestPhone || 'Not provided'}\n` +
      `❓ Concern: ${subject || 'Health consultation'}\n` +
      `💬 Message: ${firstMessage}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `⏰ ${new Date().toLocaleString('en-GH')}\n` +
      `👉 Open pharmacist dashboard:\n` +
      `${appUrl}/pharmacist`

    sendWhatsAppNotification(whatsappMessage).catch(console.error)

    return NextResponse.json(conversation, { status: 201 })
  } catch (error) {
    console.error('POST /api/support/conversations error:', error)
    return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 })
  }
}
