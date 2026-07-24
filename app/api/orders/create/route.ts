import "server-only";

import { randomUUID } from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWhatsApp } from "@/lib/notifications";

// ── WhatsApp helpers ────────────────────────────────────────────────────────

function adminPhone() {
  return process.env.ADMIN_WHATSAPP ?? "";
}

function adminApiKey() {
  return process.env.CALLMEBOT_API_KEY ?? "";
}

function isWhatsAppConfigured() {
  return Boolean(adminPhone() && adminApiKey());
}

/** Normalize a Ghana phone number to international format (233XXXXXXXXX) */
function toInternational(phone: string): string {
  const clean = phone.replace(/\s/g, "");
  if (clean.startsWith("+")) return clean.slice(1);
  if (clean.startsWith("0")) return "233" + clean.slice(1);
  return clean;
}

// ── Main handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    const customerName = typeof body.customerName === "string" ? body.customerName : "";
    const customerPhone = typeof body.customerPhone === "string" ? body.customerPhone : "";
    const customerAddress = typeof body.customerAddress === "string" ? body.customerAddress : "";
    const deliveryNotes = typeof body.deliveryNotes === "string" ? body.deliveryNotes : "";
    const userId = typeof body.userId === "string" ? body.userId : null;
    const items = Array.isArray(body.items) ? body.items : [];

    // ── Validation ─────────────────────────────────────────────────────────

    if (!customerName.trim() || customerName.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your full name" }, { status: 400 });
    }

    if (!customerPhone) {
      return NextResponse.json(
        { error: "Please enter your phone number so we can confirm your order" },
        { status: 400 },
      );
    }

    const phoneRegex = /^(\+233|233|0)[2-9][0-9]{8}$/;
    const cleanPhone = customerPhone.replace(/\s/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Please enter a valid Ghana phone number (e.g. 0537355068)" },
        { status: 400 },
      );
    }

    if (!customerAddress.trim() || customerAddress.trim().length < 5) {
      return NextResponse.json({ error: "Please enter your delivery address" }, { status: 400 });
    }

    if (items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
    }

    // ── Verify products exist and are in stock ─────────────────────────────

    type RawItem = { productId?: unknown; id?: unknown; quantity?: unknown; price?: unknown };

    const productIds = items.map((i: RawItem) => {
      const id = i.productId ?? i.id;
      return typeof id === "string" ? id : "";
    });

    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, activeListing: true },
      select: { id: true, name: true, quantity: true, price: true, imageUrl: true, category: true, userId: true },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: "One or more products are no longer available" },
        { status: 400 },
      );
    }

    // Stock check
    for (const item of items as RawItem[]) {
      const pId = String(item.productId ?? item.id ?? "");
      const qty = Number(item.quantity ?? 1);
      const product = products.find((p) => p.id === pId);
      if (!product) continue;
      if (product.quantity < qty) {
        return NextResponse.json(
          { error: `Sorry, we only have ${product.quantity} units of ${product.name} in stock` },
          { status: 400 },
        );
      }
    }

    // ── Build order items using DB prices (trust server, not client) ───────

    const orderItems = (items as RawItem[]).map((item) => {
      const pId = String(item.productId ?? item.id ?? "");
      const qty = Math.max(1, Number(item.quantity ?? 1));
      const product = products.find((p) => p.id === pId)!;
      const unitPrice = Number(product.price);
      const lineTotal = unitPrice * qty;
      return {
        productId: pId,
        name: product.name,
        unitPrice: unitPrice.toFixed(2),
        quantity: qty,
        lineTotal: lineTotal.toFixed(2),
        imageUrl: product.imageUrl,
        category: product.category,
        lineTotalNum: lineTotal,
      };
    });

    const total = orderItems.reduce((sum, i) => sum + i.lineTotalNum, 0);

    // Determine sellerId — products should belong to same seller
    const sellerId = products[0]?.userId ?? null;

    const reference = `cod_${randomUUID().replaceAll("-", "").slice(0, 24)}`;
    // email is required on Order; use a placeholder for COD orders
    const placeholderEmail = "cod@comforthealth.com";

    // ── Create the order ───────────────────────────────────────────────────

    const order = await prisma.order.create({
      data: {
        reference,
        sellerId,
        email: userId ?? placeholderEmail,
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        customerAddress: customerAddress.trim(),
        deliveryNotes: deliveryNotes.trim() || null,
        paymentMethod: "PAY_ON_DELIVERY",
        amount: total.toFixed(2),
        currency: "GHS",
        status: "pending",
        fulfillmentStatus: "PENDING",
        validationStatus: "UNVALIDATED",
        notificationSent: false,
        items: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            name: item.name,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            lineTotal: item.lineTotal,
            imageUrl: item.imageUrl,
            category: item.category,
          })),
        },
        statusHistory: {
          create: {
            status: "PENDING",
            note: "Order placed — Pay on delivery. Awaiting admin validation call.",
          },
        },
      },
      include: {
        items: true,
      },
    });

    // ── Decrement stock for each item (reserve immediately) ────────────────

    for (const item of orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { quantity: { decrement: item.quantity } },
      });
    }

    // ── Build notification messages ─────────────────────────────────────────

    const orderRef = order.id.slice(-6).toUpperCase();
    const itemsList = orderItems
      .map((i) => `  • ${i.name} × ${i.quantity} — GHS ${Number(i.lineTotal).toFixed(2)}`)
      .join("\n");

    const adminMessage =
      `🛍️ NEW ORDER — Comfort Health\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📋 Order: #${orderRef}\n` +
      `👤 Name: ${customerName.trim()}\n` +
      `📞 CALL THIS NUMBER: ${cleanPhone}\n` +
      `📍 Address: ${customerAddress.trim()}\n` +
      (deliveryNotes ? `📝 Notes: ${deliveryNotes}\n` : "") +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🛒 Items:\n${itemsList}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 Total: GHS ${total.toFixed(2)}\n` +
      `💳 Payment: CASH ON DELIVERY\n` +
      `⏰ Time: ${new Date().toLocaleString("en-GH")}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `⚠️ Call customer to validate before dispatching`;

    const customerWhatsApp = toInternational(cleanPhone);
    const firstName = customerName.trim().split(" ")[0] ?? customerName.trim();

    const customerMessage =
      `✅ Order Received — Comfort Health\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Hi ${firstName}! 👋\n\n` +
      `Your order #${orderRef} has been received.\n\n` +
      `🛒 Items:\n${itemsList}\n\n` +
      `💰 Total: GHS ${total.toFixed(2)}\n` +
      `💳 Pay on delivery — cash when it arrives\n\n` +
      `📞 We will call you shortly on this number to confirm your order before dispatching.\n\n` +
      `📍 Delivering to: ${customerAddress.trim()}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Thank you for choosing Comfort Health! 💚\n` +
      `Questions? Call us on ${adminPhone()}`;

    // ── Send WhatsApp notifications (best-effort) ──────────────────────────

    if (isWhatsAppConfigured()) {
      const customerApiKey =
        process.env.CUSTOMER_CALLMEBOT_KEY ?? adminApiKey();

      await Promise.allSettled([
        sendWhatsApp(adminPhone(), adminApiKey(), adminMessage),
        sendWhatsApp(customerWhatsApp, customerApiKey, customerMessage),
      ]);
    } else {
      console.info(
        "WhatsApp not fully configured (ADMIN_WHATSAPP or CALLMEBOT_API_KEY missing); skipping notifications.",
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderRef,
      total: Number(total.toFixed(2)),
      estimatedTime: "30–45 minutes",
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("COD order creation error:", error);
    return NextResponse.json(
      { error: "Failed to place order. Please try again." },
      { status: 500 },
    );
  }
}
