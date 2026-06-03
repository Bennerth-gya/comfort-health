"use client";

import Link from "next/link";
import { HeartPulse, Search, ShoppingCart } from "lucide-react";
import { useUser } from "@stackframe/stack";
import { useCart } from "@/app/context/cartContext";

export default function SiteHeader() {
  const { cartCount } = useCart();
  const user = useUser();

  const adminHref = user ? "/dashboard" : "/sign-in?after=/dashboard";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600">
            <HeartPulse className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Comfi Health</h1>
            <p className="text-xs text-gray-500">Good health with comfort</p>
          </div>
        </Link>

        <div className="hidden w-125 items-center rounded-xl border border-gray-200 bg-gray-50 px-4 lg:flex">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search medicines..."
            className="h-12 w-full bg-transparent px-3 text-gray-700 outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={adminHref}
            className="hidden text-sm font-medium text-gray-600 hover:text-emerald-600 md:block"
          >
            {user ? "Dashboard" : "Admin"}
          </Link>
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
          <Link
            href={adminHref}
            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            {user ? "Dashboard" : "Login"}
          </Link>
        </div>
      </div>
    </header>
  );
}
