import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/support/stream/[id]'>
) {
  const { id } = await ctx.params
  const encoder = new TextEncoder()
  let lastMessageId: string | null = null
  let lastStatus: string | null = null
  let intervalId: ReturnType<typeof setInterval>

  const stream = new ReadableStream({
    start(controller) {
      // Confirm connection
      controller.enqueue(encoder.encode('data: {"type":"connected"}\n\n'))

      intervalId = setInterval(async () => {
        try {
          // Fetch new messages
          const newMessages = await prisma.supportMessage.findMany({
            where: {
              conversationId: id,
              ...(lastMessageId ? { id: { gt: lastMessageId } } : {}),
            },
            orderBy: { createdAt: 'asc' },
            take: 20,
          })

          if (newMessages.length > 0) {
            lastMessageId = newMessages[newMessages.length - 1].id
            const payload = JSON.stringify({
              type: 'new_messages',
              messages: newMessages,
            })
            controller.enqueue(encoder.encode(`data: ${payload}\n\n`))
          }

          // Fetch status updates
          const conversation = await prisma.supportConversation.findUnique({
            where: { id },
            select: { status: true },
          })

          if (conversation && conversation.status !== lastStatus) {
            lastStatus = conversation.status
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: 'status_update', status: conversation.status })}\n\n`
              )
            )
          }
        } catch (error) {
          console.error('SSE stream error:', error)
        }
      }, 2000)
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
