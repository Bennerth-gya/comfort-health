"use client";

import Link from "next/link";
import { HeartPulse, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import { ReactNode } from "react";

function CartIcon() {
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative rounded-xl border border-gray-200 p-3 hover:bg-gray-100"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="h-5 w-5 text-gray-700" />
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
        {cartCount}
      </span>
    </Link>
  );
}

interface SiteHeaderClientProps {
  adminNode?: ReactNode;
}

function HeaderContent({ adminNode }: SiteHeaderClientProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600">
            <HeartPulse className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-900">Comfort Health</h1>
            <p className="hidden text-xs text-gray-500 sm:block">
              Good health with comfort
            </p>
          </div>
        </Link>

        <Link
          href="/shop-page"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 sm:px-4 sm:py-2.5"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search products</span>
          <span className="sm:hidden">Shop</span>
        </Link>

        <div className="flex items-center gap-3">
          {adminNode}
          <CartIcon />
        </div>
      </div>
    </header>
  );
}

export default HeaderContent;
