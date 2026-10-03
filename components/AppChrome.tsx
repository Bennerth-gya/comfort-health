"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import BottomTabBar from "@/components/BottomTabBar";
import MobileTopBar from "@/components/MobileTopBar";
import SiteHeaderClient from "@/components/SiteHeaderClient";
import SiteFooter from "@/components/SiteFooter";

const MOBILE_CHROMELESS_PREFIXES = [
  "/add-products",
  "/ai-guide",
  "/cart",
  "/checkout",
  "/dashboard",
  "/inventory",
  "/order-success",
  "/products",
  "/search",
  "/sign-in",
];

const DESKTOP_CHROMELESS_PREFIXES = [
  "/add-products",
  "/ai-guide",
  "/dashboard",
  "/inventory",
  "/order-success",
  "/sign-in",
];

// Pages where the footer should NOT appear (e.g. full-screen flows)
const FOOTER_HIDDEN_PREFIXES = [
  "/add-products",
  "/ai-guide",
  "/cart",
  "/checkout",
  "/dashboard",
  "/inventory",
  "/order-success",
  "/sign-in",
  "/support",
  "/search",
];

function hasChrome(pathname: string | null, prefixes: string[]) {
  if (!pathname) return true;
  return !prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showMobileChrome = hasChrome(pathname, MOBILE_CHROMELESS_PREFIXES);
  const showDesktopChrome = hasChrome(pathname, DESKTOP_CHROMELESS_PREFIXES);
  const showFooter = hasChrome(pathname, FOOTER_HIDDEN_PREFIXES);

  return (
    <>
      {showMobileChrome ? <MobileTopBar /> : null}
      {showDesktopChrome ? <SiteHeaderClient /> : null}
      <main
        className={
          showMobileChrome
            ? "min-h-dvh pt-[calc(112px+env(safe-area-inset-top,0px))] pb-[calc(86px+env(safe-area-inset-bottom,16px))] md:pb-0 md:pt-0"
            : "min-h-dvh"
        }
      >
        {children}
      </main>
      {showFooter ? <SiteFooter /> : null}
      {showMobileChrome ? <BottomTabBar /> : null}
    </>
  );
}

