import "server-only";

import { Resend } from "resend";
import { createReceiptToken } from "@/lib/payment-security";
import type { PublicOrder } from "@/lib/payments";

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

function appOrigin() {
  return (
    process.env.APP_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

function orderReceiptUrl(reference: string) {
  const url = new URL("/order-success", appOrigin());
  url.searchParams.set("reference", reference);
  url.searchParams.set("receipt", createReceiptToken(reference));
  return url.toString();
}

export async function sendOrderReceiptEmail(order: PublicOrder) {
  if (!isEmailConfigured()) {
    return { sent: false as const, reason: "not_configured" };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.EMAIL_FROM!;
  const receiptUrl = orderReceiptUrl(order.reference);

  const itemLines = order.items
    .map(
      (item) =>
        `• ${item.name} × ${item.quantity} — GHS ${item.lineTotal.toFixed(2)}`,
    )
    .join("\n");

  const { error } = await resend.emails.send({
    from,
    to: order.email,
    subject: `Comfi Health order confirmed (${order.reference})`,
    text: [
      "Thank you for your order with Comfi Health.",
      "",
      `Reference: ${order.reference}`,
      `Total: GHS ${order.amount.toFixed(2)}`,
      "",
      "Items:",
      itemLines,
      "",
      `View your receipt: ${receiptUrl}`,
      "",
      "Questions? Reply to this email or contact support@comfihealth.com.",
    ].join("\n"),
  });

  if (error) {
    console.error("Failed to send order receipt email", error);
    return { sent: false as const, reason: "provider_error" };
  }

  return { sent: true as const };
}
