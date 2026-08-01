"use client";

import Link from "next/link";
import { HeartPulse, Search } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import CartIcon from "@/components/CartIcon";

export default function MobileTopBar() {
  const { cartCount } = useCart();

  return (
    <header className="safe-top fixed left-0 right-0 top-0 z-50 bg-[#1a2e22] md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 items-center gap-2 active:scale-[0.97] active:opacity-90"
          aria-label="Comfort Health home"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#15803d]">
            <HeartPulse className="h-4 w-4 text-white" aria-hidden="true" />
          </span>
          <span className="truncate text-sm font-bold text-white">
            Comfort Health
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-all duration-100 active:scale-[0.97] active:bg-white/10 active:opacity-90"
            aria-label="Search products"
          >
            <Search className="h-6 w-6" aria-hidden="true" />
          </Link>
          <CartIcon itemCount={cartCount} />
        </div>
      </div>
    </header>
  );
}
