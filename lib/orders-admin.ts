import type { OrderStatus, Prisma } from "@/generated/db";

export const ACTIVE_FULFILLMENT_STATUSES: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "ASSIGNED",
  "OUT_FOR_DELIVERY",
];

export const PENDING_FULFILLMENT_STATUSES: OrderStatus[] = ["PENDING", "CONFIRMED"];

export type AdminOrderRecord = {
  id: string;
  reference: string;
  email: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  fulfillmentStatus: OrderStatus;
  customerName: string | null;
  customerPhone: string | null;
  customerAddress: string | null;
  riderName: string | null;
  riderPhone: string | null;
  assignedAt: string | null;
  pickedUpAt: string | null;
  deliveredAt: string | null;
  createdAt: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    imageUrl: string | null;
    category: string | null;
  }>;
};

export function serializeAdminOrder(
  order: Prisma.OrderGetPayload<{ include: { items: true } }>,
): AdminOrderRecord {
  return {
    id: order.id,
    reference: order.reference,
    email: order.email,
    amount: Number(order.amount),
    currency: order.currency,
    paymentStatus: order.status,
    fulfillmentStatus: order.fulfillmentStatus,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    customerAddress: order.customerAddress,
    riderName: order.riderName,
    riderPhone: order.riderPhone,
    assignedAt: order.assignedAt?.toISOString() ?? null,
    pickedUpAt: order.pickedUpAt?.toISOString() ?? null,
    deliveredAt: order.deliveredAt?.toISOString() ?? null,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      lineTotal: Number(item.lineTotal),
      imageUrl: item.imageUrl,
      category: item.category,
    })),
  };
}
