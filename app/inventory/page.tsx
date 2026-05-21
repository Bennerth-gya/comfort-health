import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  AlertTriangle,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  MessageSquare,
  Package,
  PackageCheck,
  PackageX,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  Wallet,
} from "lucide-react";
import Link from "next/link";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GHS",
  minimumFractionDigits: 2,
});

const categories = [
  "Pain Relief",
  "Sexual Wellness",
  "Women's Care",
  "Flu & Cold",
  "Vitamins & Supplements",
  "General Health",
];

const expiryLabels = [
  "Dec 2026",
  "Aug 2026",
  "Jul 2026",
  "May 2025",
  "Sep 2026",
  "Nov 2026",
];

const tabLabels = ["All Products", "In Stock", "Low Stock", "Out of Stock"];

function getCategory(productName: string, index: number) {
  const name = productName.toLowerCase();

  if (name.includes("condom")) return "Sexual Wellness";
  if (name.includes("panadol") || name.includes("pain")) return "Pain Relief";
  if (name.includes("contraceptive") || name.includes("emcon")) return "Women's Care";
  if (name.includes("vicks") || name.includes("flu")) return "Flu & Cold";
  if (name.includes("vitamin")) return "Vitamins & Supplements";

  return categories[index % categories.length];
}

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
  const user = await getCurrentUser();
  const userId = user.id;

  const products = await prisma.product.findMany({
    where: { userId },
    orderBy: { createAt: "desc" },
  });

  const rows = products.map((product, index) => {
    const status = getStatus(product.quantity, product.lowStock);

    return {
      ...product,
      category: getCategory(product.name, index),
      expiryDate: expiryLabels[index % expiryLabels.length],
      status,
      initials: getProductInitials(product.name),
    };
  });

  const totalProducts = rows.length;
  const outOfStock = rows.filter((product) => product.quantity <= 0).length;
  const lowStock = rows.filter(
    (product) =>
      product.quantity > 0 &&
      product.lowStock !== null &&
      product.quantity <= product.lowStock,
  ).length;
  const inStock = totalProducts - lowStock - outOfStock;
  const inventoryValue = rows.reduce(
    (sum, product) => sum + Number(product.price) * product.quantity,
    0,
  );

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
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Sidebar currentPath="/inventory" />

      <div className="ml-64 min-h-screen">
        <header className="flex h-24 items-center justify-between border-b border-gray-200 bg-white px-8">
          <h1 className="text-xl font-semibold text-slate-950">Inventory</h1>

          <div className="flex items-center gap-8">
            <div className="relative hidden lg:block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                aria-label="Search inventory"
                className="h-11 w-[420px] rounded-lg border border-gray-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white"
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
            <div className="mb-6 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <h2 className="text-lg font-semibold text-slate-950">
                Inventory List
              </h2>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="inline-flex rounded-lg bg-slate-100 p-1">
                  {tabLabels.map((label, index) => (
                    <button
                      className={`h-9 rounded-md px-5 text-sm font-semibold ${
                        index === 0
                          ? "bg-white text-emerald-700 shadow-sm"
                          : "text-slate-600 hover:text-slate-950"
                      }`}
                      key={label}
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    className="inline-flex h-11 min-w-44 items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 text-sm text-slate-900"
                    type="button"
                  >
                    All Categories
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </button>
                  <button
                    className="inline-flex h-11 items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 text-sm font-semibold text-slate-900"
                    type="button"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filter
                  </button>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      aria-label="Search products"
                      className="h-11 w-72 rounded-lg border border-gray-200 bg-white pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-emerald-500"
                      placeholder="Search products..."
                      type="search"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full min-w-[980px] border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-4 font-semibold">Product</th>
                    <th className="px-4 py-4 font-semibold">Category</th>
                    <th className="px-4 py-4 font-semibold">SKU</th>
                    <th className="px-4 py-4 font-semibold">Price (GHS)</th>
                    <th className="px-4 py-4 font-semibold">Stock</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="px-4 py-4 font-semibold">Expiry Date</th>
                    <th className="px-4 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rows.length > 0 ? (
                    rows.map((product) => (
                      <tr className="bg-white" key={product.id}>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-50 to-blue-50 text-xs font-bold text-emerald-800 ring-1 ring-gray-200">
                              {product.initials || "PR"}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-950">
                                {product.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                Added {product.createAt.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {product.category}
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {product.sku ?? "N/A"}
                        </td>
                        <td className="px-4 py-4 text-slate-900">
                          {Number(product.price).toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-slate-900">
                          {product.quantity}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold ${product.status.className}`}
                          >
                            {product.status.label}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {product.expiryDate}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <button
                              aria-label={`Edit ${product.name}`}
                              className="rounded-lg border border-gray-200 p-2 text-slate-600 hover:bg-slate-50"
                              type="button"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              aria-label={`Delete ${product.name}`}
                              className="rounded-lg border border-red-100 bg-red-50 p-2 text-red-500 hover:bg-red-100"
                              type="button"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-4 py-14 text-center text-slate-500" colSpan={8}>
                        No products found for this account yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
              <p>
                Showing {rows.length > 0 ? "1" : "0"} to {Math.min(rows.length, 5)} of{" "}
                {rows.length} products
              </p>

              <div className="flex items-center gap-3">
                <button
                  aria-label="Previous page"
                  className="rounded-lg border border-gray-200 p-2 text-slate-600 hover:bg-slate-50"
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    className={`h-9 w-9 rounded-lg border text-sm font-semibold ${
                      page === 1
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-gray-200 bg-white text-slate-700"
                    }`}
                    key={page}
                    type="button"
                  >
                    {page}
                  </button>
                ))}
                <span className="px-1">...</span>
                <button
                  className="h-9 w-10 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-slate-700"
                  type="button"
                >
                  32
                </button>
                <button
                  aria-label="Next page"
                  className="rounded-lg border border-gray-200 p-2 text-slate-600 hover:bg-slate-50"
                  type="button"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <button
                className="inline-flex h-10 items-center justify-between gap-8 rounded-lg border border-gray-200 bg-white px-4 text-sm text-slate-700"
                type="button"
              >
                5 per page
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
