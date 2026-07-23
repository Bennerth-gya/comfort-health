import "server-only";

import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminUser } from "@/lib/auth";
import type { ValidationStatus } from "@/generated/db";

const VALID_STATUSES: ValidationStatus[] = ["UNVALIDATED", "CALLED", "VALIDATED", "REJECTED"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdminUser();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = (await req.json()) as { validationStatus?: string };
    const { validationStatus } = body;

    if (!validationStatus || !VALID_STATUSES.includes(validationStatus as ValidationStatus)) {
      return NextResponse.json(
        { error: `validationStatus must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 },
      );
    }

    const status = validationStatus as ValidationStatus;

    const order = await prisma.order.update({
      where: { id },
      data: {
        validationStatus: status,
        ...(status === "VALIDATED" && { validatedAt: new Date() }),
        ...(status === "CALLED" && { adminCalledAt: new Date() }),
      },
      include: { items: true },
    });

    return NextResponse.json({ success: true, orderId: order.id, validationStatus: order.validationStatus });
  } catch (error) {
    console.error("Validation status update error:", error);
    return NextResponse.json({ error: "Failed to update validation status" }, { status: 500 });
  }
}
