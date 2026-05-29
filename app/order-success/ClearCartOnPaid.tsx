"use client";

import { useEffect } from "react";
import { useCart } from "@/app/context/cartContext";

export default function ClearCartOnPaid() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
