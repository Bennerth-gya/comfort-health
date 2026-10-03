"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import { useToast } from "@/app/context/toastContext";
import { useRouter } from "next/navigation";
import type { CartItem } from "@/app/context/cartContext";

interface AddBundleToCartButtonProps {
  items: CartItem[];
  bundleName: string;
}

export default function AddBundleToCartButton({ items, bundleName }: AddBundleToCartButtonProps) {
  const { addToCart } = useCart();
  const { pushToast } = useToast();
  const router = useRouter();
  const [done, setDone] = useState(false);

  const handleAdd = () => {
    items.forEach((item) => addToCart(item));
    setDone(true);
    pushToast({
      title: "Bundle added to cart",
      description: `${bundleName} — ${items.length} item${items.length !== 1 ? "s" : ""} added.`,
      variant: "success",
    });
    setTimeout(() => {
      router.push("/cart");
    }, 800);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={done}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#15803d] py-3.5 text-sm font-bold text-white transition hover:bg-[#166534] active:scale-[0.98] disabled:opacity-80"
    >
      {done ? (
        <>
          <Check className="h-4 w-4" /> Added — going to cart…
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" /> Add Bundle to Cart
        </>
      )}
    </button>
  );
}
