import { NextResponse } from "next/server";
import { getAdminUserOrNull } from "@/lib/auth";
import { PENDING_FULFILLMENT_STATUSES } from "@/lib/orders-admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getAdminUserOrNull();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pendingCount = await prisma.order.count({
    where: {
      fulfillmentStatus: {
        in: PENDING_FULFILLMENT_STATUSES,
      },
      status: {
        in: ["paid", "paid_fulfillment_review"],
      },
    },
  });

  return NextResponse.json({ pendingCount });
}
