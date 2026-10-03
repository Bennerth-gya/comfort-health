"use client";

import Link from "next/link";
import { Home, ShoppingBag, BookOpen, HeartPulse } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/cartContext";

const tabs = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/shop-page", icon: ShoppingBag },
  { label: "Essentials", href: "/student-essentials", icon: BookOpen },
  { label: "Health Hub", href: "/health", icon: HeartPulse },
];

function isActive(pathname: string | null, href: string) {
  if (!pathname) return href === "/";
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function BottomTabBar() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  return (
    <nav
      className="safe-bottom fixed bottom-0 left-0 right-0 z-50 border-t border-[#e5e7eb] bg-white md:hidden shadow-lg"
      aria-label="Primary navigation"
    >
      <div className="flex h-[62px] items-stretch">
        {tabs.map((tab) => {
          const active = isActive(pathname, tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex min-h-[62px] flex-1 flex-col items-center justify-center gap-1 transition-all duration-100 active:scale-[0.96] active:opacity-90"
              aria-current={active ? "page" : undefined}
            >
              <span
                className={`h-[3px] w-[14px] rounded-full transition-all ${
                  active ? "bg-[#15803d]" : "bg-transparent"
                }`}
                aria-hidden="true"
              />
              <Icon
                className={`h-5 w-5 ${active ? "text-[#15803d]" : "text-[#6b7280]"}`}
                aria-hidden="true"
              />
              {tab.href === "/shop-page" && cartCount > 0 ? (
                <span className="absolute right-2 top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#15803d] px-1 text-[9px] font-bold text-white border border-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              ) : null}
              <span
                className={`text-[10px] font-medium leading-tight text-center px-0.5 truncate max-w-full ${
                  active ? "text-[#15803d] font-semibold" : "text-[#6b7280]"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
