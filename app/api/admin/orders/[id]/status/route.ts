import { NextResponse } from "next/server";
import { OrderStatus } from "@/generated/db";
import { getAdminUserOrNull } from "@/lib/auth";
import { notifyRider, toOrderNotificationPayload } from "@/lib/notifications";
import { serializeAdminOrder } from "@/lib/orders-admin";
import { prisma } from "@/lib/prisma";
import {
  assertJsonContentType,
  assertSameOrigin,
  readJsonRequest,
  RequestSecurityError,
} from "@/lib/request-security";
import { OrderStatusUpdateSchema, validationMessage } from "@/lib/validation";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    assertSameOrigin(request);
    assertJsonContentType(request);

    const admin = await getAdminUserOrNull();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const parsed = OrderStatusUpdateSchema.safeParse(
      await readJsonRequest(request, 8_000),
    );

    if (!parsed.success) {
      return NextResponse.json(
        { error: validationMessage(parsed.error) },
        { status: 400 },
      );
    }

    const { status, riderName, riderPhone, riderApiKey, note } = parsed.data;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        fulfillmentStatus: status as OrderStatus,
        ...(riderName ? { riderName } : {}),
        ...(riderPhone ? { riderPhone } : {}),
        ...(status === "ASSIGNED" ? { assignedAt: new Date() } : {}),
        ...(status === "OUT_FOR_DELIVERY" ? { pickedUpAt: new Date() } : {}),
        ...(status === "DELIVERED" ? { deliveredAt: new Date() } : {}),
        statusHistory: {
          create: {
            status: status as OrderStatus,
            note: note ?? `Status changed to ${status}`,
          },
        },
      },
      include: {
        items: true,
      },
    });

    if (status === "ASSIGNED" && riderPhone && riderApiKey) {
      await notifyRider(
        riderPhone,
        riderApiKey,
        toOrderNotificationPayload(updatedOrder),
      );
    }

    return NextResponse.json({
      success: true,
      order: serializeAdminOrder(updatedOrder),
    });
  } catch (error) {
    if (error instanceof RequestSecurityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to update order status", error);
    return NextResponse.json({ error: "Failed to update order status." }, { status: 500 });
  }
}
