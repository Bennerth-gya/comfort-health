"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminOrdersNavLink({
  className,
  activeClassName,
  inactiveClassName,
}: {
  className: string;
  activeClassName: string;
  inactiveClassName: string;
}) {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);
  const isActive = pathname === "/admin/orders" || pathname.startsWith("/admin/orders/");

  useEffect(() => {
    let cancelled = false;

    async function loadPendingCount() {
      try {
        const response = await fetch("/api/admin/orders/pending-count", {
          cache: "no-store",
        });
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { pendingCount?: number };
        if (!cancelled) {
          setPendingCount(payload.pendingCount ?? 0);
        }
      } catch {
        // Ignore polling errors in nav badge.
      }
    }

    void loadPendingCount();
    const intervalId = window.setInterval(loadPendingCount, 15_000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <Link
      href="/admin/orders"
      className={`${className} ${isActive ? activeClassName : inactiveClassName}`}
    >
      <ShoppingBag className="h-5 w-5" />
      <span className="relative">
        Live orders
        {pendingCount > 0 ? (
          <span className="absolute -right-5 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {pendingCount > 9 ? "9+" : pendingCount}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
