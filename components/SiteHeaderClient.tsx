"use client";

import Link from "next/link";
import { HeartPulse, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import { type FormEvent, type ReactNode, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isLocalClient } from "@/lib/admin-client";

function CartIcon() {
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {cartCount > 0 ? (
        <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#15803d] px-1 text-[10px] font-bold leading-none text-white ring-2 ring-[#1a2e22]">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      ) : null}
    </Link>
  );
}

interface SiteHeaderClientProps {
  adminNode?: ReactNode;
}

export default function SiteHeaderClient({ adminNode }: SiteHeaderClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [isPharmacyOpen, setIsPharmacyOpen] = useState(false);

  useEffect(() => {
    // Simple check based on pharmacyHours utility, evaluated on client side
    // to match current local time
    const checkHours = () => {
      const now = new Date();
      const ghanaTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'Africa/Accra' })
      );
      const day = ghanaTime.getDay();
      const hour = ghanaTime.getHours();
      
      let open = false;
      if (day >= 1 && day <= 5) {
        open = hour >= 8 && hour < 20;
      } else if (day === 6) {
        open = hour >= 9 && hour < 18;
      } else if (day === 0) {
        open = hour >= 10 && hour < 16;
      }
      setIsPharmacyOpen(open);
    };
    
    checkHours();
    const intervalId = setInterval(checkHours, 60000);
    return () => clearInterval(intervalId);
  }, []);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <header className="safe-top sticky top-0 z-50 hidden h-16 border-b border-[#254532] bg-[#1a2e22] md:flex">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#15803d]">
            <HeartPulse className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold leading-tight text-white">Comfort Health</h1>
            <p className="text-[11px] leading-tight text-emerald-100/80">
              Good health with comfort
            </p>
          </div>
        </Link>

        <form
          onSubmit={submitSearch}
          className="flex h-10 w-[400px] max-w-[42vw] items-center rounded-full border-[1.5px] border-[#d1fae5] bg-white px-4 shadow-sm"
          role="search"
        >
          <Search className="h-[18px] w-[18px] shrink-0 text-[#15803d]" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search medicines, vitamins..."
            className="h-full min-w-0 flex-1 bg-transparent px-3 text-base text-[#0f2318] outline-none placeholder:text-gray-400"
            aria-label="Search medicines, vitamins"
          />
        </form>

        <div className="flex items-center gap-3">
          <Link
            href="/support"
            className="flex items-center gap-1.5 text-sm font-medium text-white transition hover:text-emerald-100"
          >
            Pharmacist Support
            <span className="relative flex h-2 w-2">
              {isPharmacyOpen && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${isPharmacyOpen ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
            </span>
          </Link>
          <div className="h-4 w-px bg-[#254532]"></div>
          {(isLocalClient() || (pathname && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname.startsWith('/pharmacist')))) && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-white underline-offset-4 transition hover:text-emerald-100 hover:underline"
            >
              Dashboard
            </Link>
          )}
          {adminNode}
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
