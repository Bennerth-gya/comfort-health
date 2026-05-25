"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Pencil,
  Trash2,
  Search as SearchIcon,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  Package,
} from "lucide-react";
import EditProductModal from "./EditProductModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

type Product = {
  id: string;
  name: string;
  description?: string | null;
  category?: string | null;
  sku?: string | null;
  price: number;
  quantity: number;
  lowStock?: number | null;
  manufacturer?: string | null;
  imageUrl?: string | null;
  activeListing?: boolean;
  createAt?: string;
};

function useDebounced(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

function getProductInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

const AVATAR_PALETTES = [
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-sky-100", text: "text-sky-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-orange-100", text: "text-orange-700" },
];

function avatarPalette(id: string) {
  const sum = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_PALETTES[sum % AVATAR_PALETTES.length];
}

function StatusBadge({ quantity, lowStock }: { quantity: number; lowStock?: number | null }) {
  if (quantity <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 ring-1 ring-red-100">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        Out of Stock
      </span>
    );
  }
  if (lowStock !== null && lowStock !== undefined && quantity <= lowStock) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 ring-1 ring-amber-100">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
        Low Stock
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-100">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      In Stock
    </span>
  );
}

function StockBar({ quantity, lowStock }: { quantity: number; lowStock?: number | null }) {
  if (quantity <= 0) return null;
  const max = Math.max(quantity, (lowStock ?? 0) * 4, 100);
  const pct = Math.min((quantity / max) * 100, 100);
  const isLow = lowStock !== null && lowStock !== undefined && quantity <= lowStock;
  return (
    <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full transition-all ${isLow ? "bg-amber-400" : "bg-emerald-400"}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

const CATEGORIES = [
  "Pain Relief",
  "Sexual Wellness",
  "Women's Care",
  "Flu & Cold",
  "Vitamins & Supplements",
  "General Health",
];

export default function InventoryClient({ initialRows }: { initialRows?: Product[] }) {
  const [rows, setRows] = useState<Product[]>(initialRows || []);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debounced = useDebounced(search, 350);
  const [page, setPage] = useState(0);
  const [limit] = useState(20);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", String(limit));
      params.set("skip", String(page * limit));
      if (debounced) params.set("q", debounced);
      if (category) params.set("category", category);
      if (statusFilter) params.set("status", statusFilter);
      if (typeof minPrice === "number") params.set("minPrice", String(minPrice));
      if (typeof maxPrice === "number") params.set("maxPrice", String(maxPrice));

      const res = await fetch(`/api/admin/products?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to fetch");
      setRows(data.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [debounced, limit, page, category, statusFilter, minPrice, maxPrice]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, [fetchProducts]);

  const onSave = useCallback(async (product: Product) => {
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated?.error || "Failed to update");
      setRows((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const onDelete = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to delete");
      setRows((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const filteredRows = useMemo(() => rows, [rows]);

  const hasActiveFilters = !!(category || statusFilter || minPrice || maxPrice);

  const clearFilters = () => {
    setCategory(null);
    setStatusFilter(null);
    setMinPrice(null);
    setMaxPrice(null);
    setSearch("");
  };

  return (
    <div className="space-y-4">

      {/* ── Toolbar ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative max-w-sm flex-1">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search products, SKU, brand…"
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter toggle */}
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <X className="h-3.5 w-3.5" /> Clear filters
            </button>
          )}
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition ${
              showFilters || hasActiveFilters
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                {[category, statusFilter, minPrice, maxPrice].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Filter panel ── */}
      {showFilters && (
        <div className="flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Category</label>
            <select
              value={category ?? ""}
              onChange={(e) => { setCategory(e.target.value || null); setPage(0); }}
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Status</label>
            <select
              value={statusFilter ?? ""}
              onChange={(e) => { setStatusFilter(e.target.value || null); setPage(0); }}
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">Any status</option>
              <option value="in">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Min Price (GHS)</label>
            <input
              placeholder="0.00"
              type="number"
              value={minPrice ?? ""}
              onChange={(e) => { setMinPrice(e.target.value === "" ? null : Number(e.target.value)); setPage(0); }}
              className="h-9 w-28 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Max Price (GHS)</label>
            <input
              placeholder="999.99"
              type="number"
              value={maxPrice ?? ""}
              onChange={(e) => { setMaxPrice(e.target.value === "" ? null : Number(e.target.value)); setPage(0); }}
              className="h-9 w-28 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>
      )}

      {/* ── Table ── */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Product</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">SKU</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Category</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Price</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Stock</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {loading ? (
                /* Skeleton rows */
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-slate-100" />
                        <div className="space-y-1.5">
                          <div className="h-3.5 w-36 rounded bg-slate-100" />
                          <div className="h-2.5 w-20 rounded bg-slate-100" />
                        </div>
                      </div>
                    </td>
                    {[1,2,3,4,5,6].map((c) => (
                      <td key={c} className="px-5 py-4">
                        <div className="h-3.5 w-16 rounded bg-slate-100" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Package className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700">No products found</p>
                        <p className="mt-0.5 text-xs text-slate-400">Try adjusting your search or filters.</p>
                      </div>
                      {(search || hasActiveFilters) && (
                        <button
                          onClick={clearFilters}
                          className="mt-1 rounded-lg border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRows.map((p) => {
                  const palette = avatarPalette(p.id);
                  const initials = getProductInitials(p.name);
                  return (
                    <tr
                      key={p.id}
                      className="group transition-colors hover:bg-slate-50/80"
                    >
                      {/* Product */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold ${palette.bg} ${palette.text}`}>
                            {initials || "—"}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-800">{p.name}</p>
                            {p.manufacturer && (
                              <p className="truncate text-xs text-slate-400">{p.manufacturer}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="px-5 py-3.5">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-500">
                          {p.sku ?? "—"}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-slate-600">{p.category ?? "—"}</span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-slate-800">
                          GHS {Number(p.price).toFixed(2)}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="px-5 py-3.5">
                        <div>
                          <span className={`font-semibold ${p.quantity <= 0 ? "text-red-500" : p.lowStock !== null && p.lowStock !== undefined && p.quantity <= p.lowStock ? "text-amber-600" : "text-slate-800"}`}>
                            {p.quantity.toLocaleString()}
                          </span>
                          {p.lowStock !== null && p.lowStock !== undefined && (
                            <span className="ml-1 text-xs text-slate-400">/ {p.lowStock} min</span>
                          )}
                          <StockBar quantity={p.quantity} lowStock={p.lowStock} />
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <StatusBadge quantity={p.quantity} lowStock={p.lowStock} />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            onClick={() => setEditing(p)}
                            aria-label={`Edit ${p.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleting(p)}
                            aria-label={`Delete ${p.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Footer / Pagination ── */}
        {!loading && filteredRows.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-5 py-3">
            <p className="text-xs text-slate-500">
              Showing <span className="font-semibold text-slate-700">{filteredRows.length}</span> product{filteredRows.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="min-w-[5rem] text-center text-xs font-medium text-slate-600">
                Page {page + 1}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={filteredRows.length < limit}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <EditProductModal
        open={!!editing}
        product={editing || undefined}
        onClose={() => setEditing(null)}
        onSave={async (updated) => await onSave(updated)}
      />
      <ConfirmDeleteModal
        open={!!deleting}
        productName={deleting?.name}
        onClose={() => setDeleting(null)}
        onConfirm={async () => {
          if (!deleting) return;
          await onDelete(deleting.id);
          setDeleting(null);
        }}
      />
    </div>
  );
}