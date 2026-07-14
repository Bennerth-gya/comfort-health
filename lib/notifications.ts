import "server-only";

import { Resend } from "resend";

export type OrderNotificationPayload = {
  id: string;
  reference: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  total: number;
  createdAt: Date;
  items: Array<{ name: string; quantity: number; price: number }>;
};

function appOrigin() {
  return (
    process.env.APP_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

function fromEmail() {
  return process.env.FROM_EMAIL ?? process.env.EMAIL_FROM ?? "orders@comforthealth.com";
}

function adminEmail() {
  return process.env.ADMIN_EMAIL ?? process.env.ADMIN_EMAILS?.split(",")[0]?.trim();
}

function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY && fromEmail() && adminEmail());
}

function isWhatsAppConfigured() {
  return Boolean(process.env.ADMIN_WHATSAPP && process.env.CALLMEBOT_API_KEY);
}

export async function sendWhatsApp(
  phone: string,
  apiKey: string,
  message: string,
): Promise<boolean> {
  try {
    const normalizedPhone = phone.replace(/\D/g, "");
    const encoded = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${normalizedPhone}&text=${encoded}&apikey=${apiKey}`;
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    return res.ok;
  } catch (error) {
    console.error("WhatsApp notification failed:", error);
    return false;
  }
}

export async function sendOrderEmail(order: OrderNotificationPayload): Promise<boolean> {
  if (!isResendConfigured()) {
    console.info("Resend is not configured; skipping admin order email.");
    return false;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const itemsList = order.items
      .map((item) => `• ${item.name} × ${item.quantity} — GHS ${item.price.toFixed(2)}`)
      .join("\n");
    const orderLabel = order.reference.slice(-6).toUpperCase();
    const dashboardUrl = `${appOrigin()}/admin/orders`;

    await resend.emails.send({
      from: fromEmail(),
      to: adminEmail()!,
      subject: `🛍️ New Order #${orderLabel} — GHS ${order.total.toFixed(2)}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="background: #14532d; padding: 20px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">🏥 New Comfort Health Order</h1>
          </div>
          <div style="background: #f0fdf4; padding: 24px; border: 1px solid #bbf7d0; border-radius: 0 0 12px 12px;">
            <p style="color: #14532d; font-size: 13px; font-weight: 600; margin: 0 0 16px;">
              Order #${orderLabel} · ${order.createdAt.toLocaleString("en-GH")}
            </p>
            <h2 style="margin: 0 0 8px; color: #0f2318;">Customer</h2>
            <p style="margin: 0 0 4px;">Name: <strong>${order.customerName}</strong></p>
            <p style="margin: 0 0 4px;">Phone: <strong>${order.customerPhone || "Not provided"}</strong></p>
            <p style="margin: 0 0 16px;">Address: <strong>${order.customerAddress || "Campus delivery"}</strong></p>
            <h2 style="margin: 0 0 8px; color: #0f2318;">Items Ordered</h2>
            <pre style="background: white; padding: 12px; border-radius: 8px; font-size: 13px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${itemsList}</pre>
            <div style="background: #15803d; color: white; padding: 12px 16px; border-radius: 8px; margin-top: 16px;">
              <strong style="font-size: 18px;">Total: GHS ${order.total.toFixed(2)}</strong>
            </div>
            <a href="${dashboardUrl}" style="display: inline-block; margin-top: 16px; background: #0f2318; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              View in Dashboard →
            </a>
          </div>
        </div>
      `,
    });

    if (order.customerEmail) {
      await resend.emails.send({
        from: fromEmail(),
        to: order.customerEmail,
        subject: "✅ Order Confirmed — Comfort Health",
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <div style="background: #14532d; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 20px;">Order Confirmed! ✅</h1>
            </div>
            <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
              <p>Hi <strong>${order.customerName}</strong>,</p>
              <p>Your order has been received and our pharmacist is preparing it now.</p>
              <p style="color: #15803d; font-weight: 600;">Estimated delivery: 30–45 minutes</p>
              <pre style="background: #f0fdf4; padding: 12px; border-radius: 8px; font-size: 13px; border: 1px solid #bbf7d0; white-space: pre-wrap;">${itemsList}</pre>
              <p style="font-size: 18px; font-weight: 700; color: #15803d;">Total paid: GHS ${order.total.toFixed(2)}</p>
              <p style="color: #6b7280; font-size: 13px;">
                Questions? WhatsApp us at ${process.env.ADMIN_WHATSAPP ?? "Comfort Health support"}
              </p>
            </div>
          </div>
        `,
      });
    }

    return true;
  } catch (error) {
    console.error("Email notification failed:", error);
    return false;
  }
}

export async function notifyNewOrder(order: OrderNotificationPayload): Promise<void> {
  const itemSummary =
    order.items.map((item) => `${item.name} x${item.quantity}`).join(", ") ||
    "See dashboard";
  const orderLabel = order.reference.slice(-6).toUpperCase();

  const whatsappMessage =
    `🛍️ NEW ORDER — Comfort Health\n` +
    `Order: #${orderLabel}\n` +
    `Customer: ${order.customerName}\n` +
    `Phone: ${order.customerPhone || "N/A"}\n` +
    `Items: ${itemSummary}\n` +
    `Total: GHS ${order.total.toFixed(2)}\n` +
    `Address: ${order.customerAddress || "Campus"}\n` +
    `⏰ ${new Date().toLocaleTimeString("en-GH")}\n` +
    `👉 Open dashboard to confirm`;

  const tasks: Promise<unknown>[] = [sendOrderEmail(order)];

  if (isWhatsAppConfigured()) {
    tasks.push(
      sendWhatsApp(
        process.env.ADMIN_WHATSAPP!,
        process.env.CALLMEBOT_API_KEY!,
        whatsappMessage,
      ),
    );
  } else {
    console.info("CallMeBot is not configured; skipping admin WhatsApp notification.");
  }

  await Promise.allSettled(tasks);
}

export async function notifyRider(
  riderPhone: string,
  riderApiKey: string,
  order: OrderNotificationPayload,
): Promise<void> {
  const orderLabel = order.reference.slice(-6).toUpperCase();
  const message =
    `🏍️ NEW DELIVERY — Comfort Health\n` +
    `Order #${orderLabel}\n` +
    `Customer: ${order.customerName}\n` +
    `Phone: ${order.customerPhone || "N/A"}\n` +
    `Deliver to: ${order.customerAddress || "Campus"}\n` +
    `Items: ${order.items.map((item) => item.name).join(", ")}\n` +
    `⚠️ Pick up from pharmacy NOW`;

  await sendWhatsApp(riderPhone, riderApiKey, message);
}

export function toOrderNotificationPayload(
  order: {
    id: string;
    reference: string;
    email: string;
    amount: unknown;
    createdAt: Date;
    customerName?: string | null;
    customerPhone?: string | null;
    customerAddress?: string | null;
    items: Array<{
      name: string;
      quantity: number;
      unitPrice: unknown;
    }>;
  },
): OrderNotificationPayload {
  return {
    id: order.id,
    reference: order.reference,
    customerName: order.customerName || order.email.split("@")[0] || "Customer",
    customerEmail: order.email,
    customerPhone: order.customerPhone ?? undefined,
    customerAddress: order.customerAddress ?? undefined,
    total: Number(order.amount),
    createdAt: order.createdAt,
    items: order.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: Number(item.unitPrice),
    })),
  };
}
