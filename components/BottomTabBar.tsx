"use client";

import Link from "next/link";
import { Home, Headphones, MessageCircleHeart, ShoppingBag, Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/cartContext";

const tabs = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/shop-page", icon: ShoppingBag },
  { label: "AI Guide", href: "/ai-guide", icon: MessageCircleHeart },
  { label: "Health", href: "/health", icon: Heart },
  { label: "Support", href: "/support", icon: Headphones },
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
      className="safe-bottom fixed bottom-0 left-0 right-0 z-50 border-t border-[#e5e7eb] bg-white md:hidden"
      aria-label="Primary navigation"
    >
      <div className="flex h-[60px] items-stretch">
        {tabs.map((tab) => {
          const active = isActive(pathname, tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex min-h-[60px] flex-1 flex-col items-center justify-center gap-1 transition-all duration-100 active:scale-[0.97] active:opacity-90"
              aria-current={active ? "page" : undefined}
            >
              <span
                className={`h-[3px] w-[3px] rounded-full ${
                  active ? "bg-[#15803d]" : "bg-transparent"
                }`}
                aria-hidden="true"
              />
              <Icon
                className={`h-5 w-5 ${active ? "text-[#15803d]" : "text-[#9ca3af]"}`}
                aria-hidden="true"
              />
              {tab.href === "/shop-page" && cartCount > 0 ? (
                <span className="absolute right-4 top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#22c55e] px-1 text-[9px] font-800 text-white border border-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              ) : null}
              <span
                className={`text-[10px] font-medium leading-none ${
                  active ? "text-[#15803d]" : "text-[#9ca3af]"
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
