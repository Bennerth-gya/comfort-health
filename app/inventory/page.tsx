import AdminShell from "@/components/AdminShell";
import { requireAdminUser } from "@/lib/auth";
import { normalizeDosageGuide } from "@/lib/dosage-guide";
import { prisma } from "@/lib/prisma";
import {
  AlertTriangle,
  Bell,
  ChevronDown,
  Download,
  MessageSquare,
  Package,
  PackageCheck,
  PackageX,
  Plus,
  Search,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import InventoryClient from "@/components/inventory/InventoryClient";

export const dynamic = "force-dynamic";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GHS",
  minimumFractionDigits: 2,
});

function getStatus(quantity: number, lowStock: number | null) {
  if (quantity <= 0) {
    return {
      label: "Out of Stock",
      className: "bg-red-100 text-red-700",
    };
  }

  if (lowStock !== null && quantity <= lowStock) {
    return {
      label: "Low Stock",
      className: "bg-orange-100 text-orange-700",
    };
  }

  return {
    label: "In Stock",
    className: "bg-emerald-100 text-emerald-700",
  };
}

function getProductInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export default async function InventoryPage() {
  const user = await requireAdminUser();
  const userId = user.id;

  const [
    products,
    totalProducts,
    storefrontProductCount,
    outOfStock,
    lowStockRows,
    inventoryValueRows,
  ] = await Promise.all([
    prisma.product.findMany({
      where: { userId, activeListing: true },
      orderBy: { createAt: "desc" },
      take: 20,
    }),
    prisma.product.count({ where: { userId, activeListing: true } }),
    prisma.product.count({ where: { activeListing: true } }),
    prisma.product.count({ where: { userId, activeListing: true, quantity: { lte: 0 } } }),
    prisma.$queryRaw<Array<{ count: number }>>`
      SELECT COUNT(*)::int AS count
      FROM "product"
      WHERE "userId" = ${userId}
        AND "activeListing" = true
        AND "quantity" > 0
        AND "lowStock" IS NOT NULL
        AND "quantity" <= "lowStock"
    `,
    prisma.$queryRaw<Array<{ value: string | null }>>`
      SELECT COALESCE(SUM("price" * "quantity"), 0)::text AS value
      FROM "product"
      WHERE "userId" = ${userId}
        AND "activeListing" = true
    `,
  ]);

  const rows = products.map((product) => {
    const status = getStatus(product.quantity, product.lowStock);

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      sku: product.sku,
      price: Number(product.price),
      quantity: product.quantity,
      lowStock: product.lowStock,
      dosage: product.dosage,
      dosageGuide: normalizeDosageGuide(product.dosageGuide),
      manufacturer: product.manufacturer,
      imageUrl: product.imageUrl,
      activeListing: product.activeListing,
      createAt: product.createAt?.toISOString(),
      expiryDate: product.expiryDate?.toISOString() ?? null,
      status,
      initials: getProductInitials(product.name),
    };
  });

  const lowStock = lowStockRows[0]?.count ?? 0;
  const inStock = totalProducts - lowStock - outOfStock;
  const inventoryValue = Number(inventoryValueRows[0]?.value ?? 0);

  const stats = [
    {
      label: "Total Products",
      value: totalProducts.toLocaleString(),
      helper: "All products in inventory",
      icon: Package,
      tone: "bg-blue-50 text-blue-600",
    },
    {
      label: "In Stock",
      value: inStock.toLocaleString(),
      helper: "Products with sufficient stock",
      icon: PackageCheck,
      tone: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Low Stock",
      value: lowStock.toLocaleString(),
      helper: "Products running low",
      icon: AlertTriangle,
      tone: "bg-orange-50 text-orange-600",
    },
    {
      label: "Out of Stock",
      value: outOfStock.toLocaleString(),
      helper: "Products out of stock",
      icon: PackageX,
      tone: "bg-red-50 text-red-600",
    },
    {
      label: "Inventory Value",
      value: currencyFormatter.format(inventoryValue),
      helper: "Total inventory value",
      icon: Wallet,
      tone: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <AdminShell className="min-h-screen bg-slate-50 text-slate-950">
      <div className="ml-64 min-h-screen">
        <header className="flex h-24 items-center justify-between border-b border-gray-200 bg-white px-8">
          <h1 className="text-xl font-semibold text-slate-950">Inventory</h1>

          <div className="flex items-center gap-8">
            <div className="relative hidden lg:block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                aria-label="Search inventory"
                className="h-11 w-105 rounded-lg border border-gray-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white"
                placeholder="Search medicines, categories, or SKU..."
                type="search"
              />
            </div>
            <div className="flex items-center gap-5 border-r border-gray-200 pr-6">
              <button
                aria-label="Notifications"
                className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                type="button"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                  3
                </span>
              </button>
              <button
                aria-label="Messages"
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                type="button"
              >
                <MessageSquare className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-800">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-950">Admin</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">
                Inventory Overview
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Manage your products, stock levels and inventory status.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="inline-flex h-11 items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                type="button"
              >
                <Download className="h-4 w-4" />
                Export Report
              </button>
              <Link
                href="/inventory/hero-slides"
                className="inline-flex h-11 items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Manage Hero Slides
              </Link>
              <Link
                href="/add-products"
                className="inline-flex h-11 items-center gap-3 rounded-lg bg-emerald-700 px-6 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800"
              >
                <Plus className="h-5 w-5" />
                Add New Product
              </Link>
            </div>
          </div>

          <section className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                  key={stat.label}
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div className={`rounded-lg p-3 ${stat.tone}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-950">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">{stat.helper}</p>
                </div>
              );
            })}
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-950">Inventory List</h2>
            </div>

            <div>
              <InventoryClient
                initialRows={rows}
                storefrontProductCount={storefrontProductCount}
              />
            </div>
          </section>
        </main>
      </div>
    </AdminShell>
  );
}
