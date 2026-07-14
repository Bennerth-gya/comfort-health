import "server-only";

import { prisma } from "@/lib/prisma";
import { sendWhatsApp } from "@/lib/notifications";

const LOW_STOCK_THRESHOLD = 5;

function isWhatsAppConfigured() {
  return Boolean(process.env.ADMIN_WHATSAPP && process.env.CALLMEBOT_API_KEY);
}

export async function checkLowStock(productIds: string[]): Promise<void> {
  if (productIds.length === 0 || !isWhatsAppConfigured()) {
    return;
  }

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
    select: {
      id: true,
      name: true,
      quantity: true,
    },
  });

  const outOfStockProducts = products.filter((product) => product.quantity <= 0);
  const lowStockProducts = products.filter(
    (product) => product.quantity > 0 && product.quantity <= LOW_STOCK_THRESHOLD,
  );

  if (outOfStockProducts.length === 0 && lowStockProducts.length === 0) {
    return;
  }

  let message = "⚠️ COMFORT HEALTH — STOCK ALERT\n\n";

  if (outOfStockProducts.length > 0) {
    message += "🔴 OUT OF STOCK:\n";
    for (const product of outOfStockProducts) {
      message += `• ${product.name} — ZERO STOCK\n`;
    }
    message += "\n";
  }

  if (lowStockProducts.length > 0) {
    message += "🟡 LOW STOCK:\n";
    for (const product of lowStockProducts) {
      message += `• ${product.name} — Only ${product.quantity} left\n`;
    }
  }

  message += "\nRestock immediately to avoid failed orders.";

  await sendWhatsApp(
    process.env.ADMIN_WHATSAPP!,
    process.env.CALLMEBOT_API_KEY!,
    message,
  );
}
