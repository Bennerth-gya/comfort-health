"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import BottomTabBar from "@/components/BottomTabBar";
import FloatingCartBar from "@/components/FloatingCartBar";
import MobileTopBar from "@/components/MobileTopBar";
import SiteHeaderClient from "@/components/SiteHeaderClient";

const MOBILE_CHROMELESS_PREFIXES = [
  "/add-products",
  "/ai-guide",
  "/cart",
  "/dashboard",
  "/handler",
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
  "/handler",
  "/inventory",
  "/order-success",
  "/sign-in",
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

  return (
    <>
      {showMobileChrome ? <MobileTopBar /> : null}
      {showDesktopChrome ? <SiteHeaderClient /> : null}
      <main
        className={
          showMobileChrome
            ? "min-h-dvh pt-[calc(56px+env(safe-area-inset-top,0px))] pb-[calc(86px+env(safe-area-inset-bottom,16px))] md:pb-0 md:pt-0"
            : "min-h-dvh"
        }
      >
        {children}
      </main>
      {showMobileChrome ? (
        <>
          <FloatingCartBar />
          <BottomTabBar />
        </>
      ) : null}
    </>
  );
}
