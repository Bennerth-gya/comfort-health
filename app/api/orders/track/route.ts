import "server-only";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/orders/track?ref=<reference>&phone=<last4orFull>
// Safe: never returns customerAddress, deliveryNotes, email, or internal IDs
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ref = (searchParams.get("ref") ?? "").trim().toUpperCase();
  const phone = (searchParams.get("phone") ?? "").trim();

  if (!ref) {
    return NextResponse.json({ error: "Order reference is required" }, { status: 400 });
  }

  try {
    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { reference: { endsWith: ref.toLowerCase() } },
          { reference: { endsWith: ref } },
          { id: { endsWith: ref.toLowerCase() } },
        ],
      },
      select: {
        id: true,
        reference: true,
        customerName: true,
        customerPhone: true,
        amount: true,
        currency: true,
        fulfillmentStatus: true,
        validationStatus: true,
        paymentMethod: true,
        createdAt: true,
        estimatedTime: true,
        deliveredAt: true,
        statusHistory: {
          orderBy: { createdAt: "asc" },
          select: { status: true, note: true, createdAt: true },
        },
        items: {
          select: {
            name: true,
            quantity: true,
            unitPrice: true,
            lineTotal: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found. Please check your reference number." }, { status: 404 });
    }

    // Verify phone if provided (last 4 digits match — soft verification without exposing full number)
    if (phone) {
      const storedLast4 = order.customerPhone?.replace(/\D/g, "").slice(-4) ?? "";
      const inputLast4 = phone.replace(/\D/g, "").slice(-4);
      if (storedLast4 && inputLast4 && storedLast4 !== inputLast4) {
        return NextResponse.json({ error: "Order not found. Please check your reference number." }, { status: 404 });
      }
    }

    // Mask phone for display — never return full phone
    const maskedPhone = order.customerPhone
      ? order.customerPhone.replace(/\D/g, "").slice(0, -4).replace(/./g, "*") +
        order.customerPhone.replace(/\D/g, "").slice(-4)
      : null;

    const STATUS_LABELS: Record<string, string> = {
      PENDING: "Order Received",
      CONFIRMED: "Confirmed",
      PREPARING: "Being Prepared",
      ASSIGNED: "Rider Assigned",
      OUT_FOR_DELIVERY: "Out for Delivery",
      DELIVERED: "Delivered",
      CANCELLED: "Cancelled",
    };

    return NextResponse.json({
      order: {
        reference: order.reference.slice(-8).toUpperCase(),
        customerName: order.customerName,
        maskedPhone,
        amount: Number(order.amount),
        currency: order.currency,
        paymentMethod: order.paymentMethod,
        fulfillmentStatus: order.fulfillmentStatus,
        statusLabel: STATUS_LABELS[order.fulfillmentStatus] ?? order.fulfillmentStatus,
        validationStatus: order.validationStatus,
        estimatedTime: order.estimatedTime,
        createdAt: order.createdAt,
        deliveredAt: order.deliveredAt,
        statusHistory: order.statusHistory.map((h) => ({
          status: h.status,
          label: STATUS_LABELS[h.status] ?? h.status,
          note: h.note,
          createdAt: h.createdAt,
        })),
        items: order.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          unitPrice: Number(item.unitPrice),
          lineTotal: Number(item.lineTotal),
          imageUrl: item.imageUrl,
        })),
      },
    });
  } catch (error) {
    console.error("Track order error:", error);
    return NextResponse.json({ error: "Unable to look up order. Please try again." }, { status: 500 });
  }
}
