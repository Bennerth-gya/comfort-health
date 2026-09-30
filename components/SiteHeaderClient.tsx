"use client";

import Link from "next/link";
import { HeartPulse, Search } from "lucide-react";
import CartIcon from "@/components/CartIcon";
import { useCart } from "@/app/context/cartContext";
import { type FormEvent, type ReactNode, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isLocalClient } from "@/lib/admin-client";

interface SiteHeaderClientProps {
  adminNode?: ReactNode;
}

export default function SiteHeaderClient({ adminNode }: SiteHeaderClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [query, setQuery] = useState("");
  const [isLocalEnvironment, setIsLocalEnvironment] = useState(false);
  const [isPharmacyOpen, setIsPharmacyOpen] = useState(false);

  const checkPharmacyHours = () => {
    const now = new Date();
    const ghanaTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'Africa/Accra' })
    );
    const day = ghanaTime.getDay();
    const hour = ghanaTime.getHours();

    if (day >= 1 && day <= 5) return hour >= 8 && hour < 20;
    if (day === 6) return hour >= 9 && hour < 18;
    if (day === 0) return hour >= 10 && hour < 16;
    return false;
  };

  useEffect(() => {
    const syncHeaderState = () => {
      setIsLocalEnvironment(isLocalClient());
      setIsPharmacyOpen(checkPharmacyHours());
    };

    const timerId = window.setTimeout(syncHeaderState, 0);
    const intervalId = window.setInterval(() => setIsPharmacyOpen(checkPharmacyHours()), 60000);

    return () => {
      window.clearTimeout(timerId);
      window.clearInterval(intervalId);
    };
  }, []);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  const showDashboard =
    (isLocalEnvironment ||
      (pathname &&
        (pathname.startsWith('/dashboard') ||
          pathname.startsWith('/admin') ||
          pathname.startsWith('/pharmacist'))));

  const navItems = [
    { href: '/', label: 'Home', active: pathname === '/' },
    { href: '/shop-page', label: 'Shop', active: pathname.startsWith('/shop') || pathname.startsWith('/products') },
    { href: '/health', label: 'Health Education', active: pathname === '/health' || pathname.startsWith('/health/') },
    { href: '/support', label: 'Pharmacist Support', active: pathname === '/support' || pathname.startsWith('/support/') },
  ];

  return (
    <header className="safe-top sticky top-0 z-50 hidden h-16 border-b border-[#254532] bg-[#1a2e22] md:flex">
      <div className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between gap-4 px-5 xl:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#15803d]">
            <HeartPulse className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold leading-tight text-white">ComfortHealth</h1>
            <p className="text-[11px] leading-tight text-emerald-100/80">Good health. With comfort.</p>
          </div>
        </Link>

        <form
          onSubmit={submitSearch}
          className="flex h-11 w-[420px] max-w-[42vw] items-center rounded-full border-[1.5px] border-[#d1fae5] bg-white px-4 shadow-sm"
          role="search"
        >
          <Search className="h-[18px] w-[18px] shrink-0 text-[#15803d]" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search health topics, medicines, vitamins..."
            className="h-full min-w-0 flex-1 bg-transparent px-3 text-base text-[#0f2318] outline-none placeholder:text-gray-400"
            aria-label="Search health topics, medicines, vitamins"
          />
        </form>

        <nav className="flex items-center gap-4 xl:gap-6" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                item.active ? 'border-b-2 border-[#4ade80] pb-1 text-white' : 'text-[#d1fae5] hover:text-white'
              }`}
            >
              {item.label}
              {item.href === '/support' && (
                <span className="relative flex h-2 w-2">
                  {isPharmacyOpen && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  )}
                  <span className={`relative inline-flex h-2 w-2 rounded-full ${isPharmacyOpen ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                </span>
              )}
            </Link>
          ))}

          <Link
            href="/about"
            className="flex h-9 items-center justify-center gap-1.5 rounded-full border border-[#254532] bg-white/5 px-3 text-sm font-medium text-white transition hover:bg-white/10"
            aria-label="About Us"
          >
            About Us
          </Link>

          {showDashboard && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-white underline-offset-4 transition hover:text-emerald-100 hover:underline"
            >
              Dashboard
            </Link>
          )}
          {adminNode}
          <CartIcon itemCount={cartCount} />
        </nav>
      </div>
    </header>
  );
}

