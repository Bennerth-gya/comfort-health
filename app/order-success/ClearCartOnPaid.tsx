"use client";

import { useEffect } from "react";
import { useCart } from "@/app/context/cartContext";

type PaidOrder = {
  reference: string;
  email: string;
  amount: number;
  currency: string;
  status: string;
  paidAt: string | null;
  items: Array<{
    productId: string;
    name: string;
    unitPrice: number;
    quantity: number;
    imageUrl: string | null;
    category: string | null;
  }>;
};

export default function ClearCartOnPaid({ order }: { order?: PaidOrder }) {
  const { clearCart, saveOrder } = useCart();

  useEffect(() => {
    if (order) {
      saveOrder({
        reference: order.reference,
        email: order.email,
        amount: order.amount,
        currency: "GHS",
        createdAt: order.paidAt ?? new Date().toISOString(),
        status: "success",
        items: order.items.map((item) => ({
          id: item.productId,
          name: item.name,
          price: item.unitPrice,
          image: item.imageUrl ?? "",
          category: item.category,
          quantity: item.quantity,
        })),
      });
    }
    clearCart();
  }, [clearCart, order, saveOrder]);

  return null;
}
