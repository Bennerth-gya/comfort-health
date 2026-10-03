"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeartPulse, Search, Menu, X } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import CartIcon from "@/components/CartIcon";

export default function MobileTopBar() {
  const router = useRouter();
  const { cartCount } = useCart();
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <header className="safe-top fixed left-0 right-0 top-0 z-50 bg-[#073b28] md:hidden shadow-md">
      {/* Top Header Row */}
      <div className="flex h-14 items-center justify-between px-3.5">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 active:scale-[0.98] transition-all"
          aria-label="ComfortHealth home"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#15803d] shadow-sm">
            <HeartPulse className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-base font-bold leading-tight text-white tracking-tight">
              ComfortHealth
            </span>
            <span className="text-[10px] font-medium leading-tight text-[#86efac]/90 truncate">
              Good health. With comfort.
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Search products"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </Link>

          <CartIcon itemCount={cartCount} />

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Integrated Search Bar Row */}
      <div className="px-3.5 pb-3 pt-0.5">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-[#15803d]">
            <Search className="h-4 w-4" aria-hidden="true" />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search health topics, medicines, vitamins..."
            className="h-10 w-full rounded-full bg-white pl-9 pr-4 text-[13px] text-[#0f2318] placeholder:text-gray-400 outline-none shadow-sm focus:ring-2 focus:ring-[#15803d]"
          />
        </form>
      </div>

      {/* Expandable Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="border-t border-[#0f4d36] bg-[#073b28] px-4 py-3 text-white space-y-0.5 animate-in slide-in-from-top-2">
          {[
            { href: "/", label: "Home" },
            { href: "/shop-page", label: "Shop All Products" },
            { href: "/student-essentials", label: "Student Essentials" },
            { href: "/bundles", label: "Bundles" },
            { href: "/health", label: "Health Hub" },
            { href: "/track-order", label: "Track Order" },
            { href: "/support", label: "Pharmacist Support" },
            { href: "/ai-guide", label: "Ask Comfort AI" },
            { href: "/about", label: "About Us" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center py-2.5 text-sm font-semibold text-white/90 hover:text-white border-b border-white/5 last:border-0"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
