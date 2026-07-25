import { NextResponse } from "next/server";
import { getAdminUserOrNull } from "@/lib/auth";
import {
  ACTIVE_FULFILLMENT_STATUSES,
  PENDING_FULFILLMENT_STATUSES,
  serializeAdminOrder,
} from "@/lib/orders-admin";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getAdminUserOrNull();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const encoder = new TextEncoder();
  let intervalId: ReturnType<typeof setInterval> | undefined;
  let lastPendingCount = 0;

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode('data: {"type":"connected"}\n\n'));

      const pollInterval = Number.parseInt(
        process.env.NEXT_PUBLIC_POLL_INTERVAL ?? "6000",
        10,
      );

      intervalId = setInterval(async () => {
        try {
          const [orders, pendingCount] = await Promise.all([
            prisma.order.findMany({
              where: {
                fulfillmentStatus: {
                  in: ACTIVE_FULFILLMENT_STATUSES,
                },
                OR: [
                  {
                    status: {
                      in: ["paid", "paid_fulfillment_review"],
                    },
                  },
                  {
                    paymentMethod: "PAY_ON_DELIVERY",
                    status: "pending",
                  },
                ],
              },
              include: {
                items: true,
              },
              orderBy: { createdAt: "desc" },
              take: 20,
            }),
            prisma.order.count({
              where: {
                fulfillmentStatus: {
                  in: PENDING_FULFILLMENT_STATUSES,
                },
                OR: [
                  {
                    status: {
                      in: ["paid", "paid_fulfillment_review"],
                    },
                  },
                  {
                    paymentMethod: "PAY_ON_DELIVERY",
                    status: "pending",
                  },
                ],
              },
            }),
          ]);

          const hasNewOrder = pendingCount > lastPendingCount;
          lastPendingCount = pendingCount;

          const payload = JSON.stringify({
            type: "orders_update",
            orders: orders.map(serializeAdminOrder),
            pendingCount,
            hasNewOrder,
            timestamp: new Date().toISOString(),
          });

          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
        } catch (error) {
          console.error("SSE order stream error:", error);
        }
      }, Number.isFinite(pollInterval) ? pollInterval : 6000);
    },
    cancel() {
      if (intervalId) {
        clearInterval(intervalId);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
