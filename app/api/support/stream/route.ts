import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Global SSE stream for the pharmacist dashboard
// Delivers new conversations and messages across all conversations
export async function GET(_req: NextRequest) {
  const encoder = new TextEncoder()
  let lastCheck = new Date()
  let intervalId: ReturnType<typeof setInterval>

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode('data: {"type":"connected"}\n\n'))

      intervalId = setInterval(async () => {
        try {
          const since = lastCheck
          lastCheck = new Date()

          // New or updated conversations
          const updatedConversations = await prisma.supportConversation.findMany({
            where: { updatedAt: { gt: since } },
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
            take: 50,
          })

          if (updatedConversations.length > 0) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: 'conversations_update',
                  conversations: updatedConversations,
                })}\n\n`
              )
            )
          }

          // New messages in any conversation
          const newMessages = await prisma.supportMessage.findMany({
            where: { createdAt: { gt: since } },
            orderBy: { createdAt: 'asc' },
            take: 30,
          })

          if (newMessages.length > 0) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: 'new_messages',
                  messages: newMessages,
                })}\n\n`
              )
            )
          }
        } catch (error) {
          console.error('Global SSE stream error:', error)
        }
      }, 3000)
    },
    cancel() {
      clearInterval(intervalId)
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}
