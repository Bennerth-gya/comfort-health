"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/cartContext";

export default function FloatingCartBar() {
  const pathname = usePathname();
  const { cartCount, subtotal } = useCart();

  if (cartCount === 0 || pathname === "/cart") {
    return null;
  }

  return (
    <Link
      href="/cart"
      className="cart-bar-enter safe-bottom fixed left-3 right-3 z-40 flex h-[52px] items-center justify-between rounded-[14px] bg-[#15803d] px-4 text-white shadow-[0_14px_30px_rgba(21,128,61,0.28)] transition-all duration-100 active:scale-[0.97] active:opacity-90 md:hidden"
      style={{ bottom: "calc(60px + env(safe-area-inset-bottom, 16px) + 8px)" }}
    >
      <span className="flex min-w-0 items-center gap-2">
        <ShoppingCart className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span className="truncate text-[13px] font-semibold">
          {cartCount} item{cartCount === 1 ? "" : "s"}
        </span>
      </span>
      <span className="truncate text-[13px] font-semibold">
        View cart - GHS {subtotal.toFixed(2)}
      </span>
    </Link>
  );
}
