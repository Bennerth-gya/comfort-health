"use client";

import {
  Boxes,
  Cross,
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Store,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/orders", icon: ShoppingBag },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Add product", href: "/add-products", icon: PlusCircle },
];

function isNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-10 flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white text-slate-700">
      <div className="flex h-24 items-center border-b border-gray-100 px-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-emerald-600 text-emerald-700">
            <Cross className="h-7 w-7" />
          </div>
          <div className="leading-none">
            <p className="text-2xl font-bold tracking-tight text-slate-950">
              Comfi
            </p>
            <p className="text-lg font-bold text-emerald-700">Health</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-8">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = isNavActive(pathname, item.href);

          return (
            <Link
              href={item.href}
              key={item.href}
              className={`flex h-11 items-center gap-4 rounded-lg px-4 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}

        <Link
          href="/"
          className="mt-4 flex h-11 items-center gap-4 rounded-lg px-4 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
        >
          <Store className="h-5 w-5" />
          View storefront
        </Link>
      </nav>

      <div className="px-4 pb-8">
        <div className="mb-8 rounded-lg bg-slate-50 p-5 text-center">
          <div className="mx-auto mb-4 flex h-20 w-28 items-end justify-center rounded-lg bg-white shadow-sm">
            <Truck className="mb-5 h-12 w-12 text-emerald-700" />
            <Boxes className="-ml-3 mb-8 h-7 w-7 text-slate-400" />
          </div>
          <p className="text-sm font-semibold text-slate-950">
            Fast. Discreet. Reliable.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            We deliver health to your door.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm font-semibold text-emerald-700">Comfi Health</p>
          <p className="mt-2 text-xs text-slate-500">
            (c) 2026 All rights reserved.
          </p>
        </div>
      </div>
    </aside>
  );
}
