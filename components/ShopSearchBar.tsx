"use client";

import { Loader2, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDebounce } from "@/hooks/useDebounce";
import ProductCard from "@/app/components/ProductCard";

export type ShopProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: string | null;
  quantity: number;
  prescriptionRequired: boolean;
};

type ShopSearchBarProps = {
  /** Current query from the URL (server-rendered). */
  initialQuery?: string;
  /** Initial product list (server-rendered — shown before client hydrates). */
  initialProducts?: ShopProduct[];
  initialTotal?: number;
  className?: string;
};

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; products: ShopProduct[]; total: number }
  | { status: "error"; message: string };

const PAGE_SIZE = 48;

async function fetchProducts(query: string, signal: AbortSignal) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  params.set("limit", String(PAGE_SIZE));

  const res = await fetch(`/api/products?${params.toString()}`, { signal });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? "Failed to fetch products");
  }
  return res.json() as Promise<{
    products: ShopProduct[];
    total: number;
  }>;
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
      <h2 className="text-xl font-semibold text-amber-900">
        {query ? "No products found" : "No products available"}
      </h2>
      <p className="mt-2 text-amber-800">
        {query
          ? `Nothing close to "${query}" yet. Try a shorter word, brand name, or category (e.g. "pain", "vitamin").`
          : "Please check back soon for available medicines."}
      </p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
      <div className="h-60 w-full animate-pulse bg-gray-100" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-20 animate-pulse rounded-full bg-gray-100" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-100" />
        <div className="h-6 w-1/3 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="border-t border-gray-200 px-5 py-4">
        <div className="h-10 w-full animate-pulse rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}

function filterProductsLocally(products: ShopProduct[], query: string): ShopProduct[] {
  if (!query) return products;
  const tokens = query
    .toLowerCase()
    .split(/[\s,/+]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0);

  if (tokens.length === 0) return products;

  return products
    .map((product) => {
      let score = 0;
      const name = product.name.toLowerCase();
      const category = (product.category ?? "").toLowerCase();

      const fullQuery = query.toLowerCase();
      if (name === fullQuery) {
        score += 100;
      } else if (name.startsWith(fullQuery)) {
        score += 50;
      } else if (name.includes(fullQuery)) {
        score += 20;
      }

      for (const token of tokens) {
        if (name.includes(token)) {
          score += 10;
          if (name.startsWith(token) || name.split(/\s+/).some((word) => word.startsWith(token))) {
            score += 10;
          }
        }
        if (category.includes(token)) {
          score += 5;
        }
      }

      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
}

function ProductGrid({
  products,
  total,
  isLoading,
  error,
  query,
}: {
  products: ShopProduct[];
  total: number;
  isLoading: boolean;
  error: string | null;
  query: string;
}) {
  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="font-semibold text-red-800">Search failed</p>
        <p className="mt-1 text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (isLoading && products.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyState query={query} />;
  }

  return (
    <div className={`transition-opacity duration-150 ${isLoading ? "opacity-60" : "opacity-100"}`}>
      <p className="mb-6 text-sm text-gray-600">
        Showing <span className="font-semibold">{products.length}</span> of{" "}
        <span className="font-semibold">{total}</span> product
        {total === 1 ? "" : "s"}
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.imageUrl,
              category: product.category,
              quantity: product.quantity,
              prescriptionRequired: product.prescriptionRequired,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Live search bar + product grid.
 * Results update as-you-type (150 ms debounce).
 * The URL is kept in sync so the page is shareable and bookmarkable.
 */
export default function ShopSearchBar({
  initialQuery = "",
  initialProducts = [],
  initialTotal = 0,
  className = "",
}: ShopSearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [searchState, setSearchState] = useState<SearchState>({ status: "idle" });

  const debouncedQuery = useDebounce(inputValue.trim(), 150);

  // Local memory cache pool of all loaded products
  const allFetchedProducts = useRef<Map<string, ShopProduct>>(new Map());

  // Seed the cache pool with initial products
  const hasSeededRef = useRef(false);
  if (!hasSeededRef.current && initialProducts.length > 0) {
    initialProducts.forEach((p) => {
      allFetchedProducts.current.set(p.id, p);
    });
    hasSeededRef.current = true;
  }

  // Display state for instant feedback
  const [displayedProducts, setDisplayedProducts] = useState<ShopProduct[]>(initialProducts);
  const [displayedTotal, setDisplayedTotal] = useState<number>(initialTotal);

  // Synchronize client-side input with local cache + background query
  useEffect(() => {
    const query = inputValue.trim();

    if (!query) {
      const baseProducts = searchState.status === "success" ? searchState.products : initialProducts;
      const baseTotal = searchState.status === "success" ? searchState.total : initialTotal;
      setDisplayedProducts(baseProducts);
      setDisplayedTotal(baseTotal);
      return;
    }

    if (searchState.status === "success" && debouncedQuery === query) {
      setDisplayedProducts(searchState.products);
      setDisplayedTotal(searchState.total);
      return;
    }

    // Fast local filtering on currently cached products
    const pool = Array.from(allFetchedProducts.current.values());
    const filtered = filterProductsLocally(pool, query);
    setDisplayedProducts(filtered);
    setDisplayedTotal(filtered.length);
  }, [inputValue, debouncedQuery, searchState, initialProducts, initialTotal]);

  // Keep the URL ?q= param in sync without a hard navigation so
  // the page stays interactive and results are shareable.
  useEffect(() => {
    const trimmed = debouncedQuery.slice(0, 100);
    const current = new URL(window.location.href);
    const existing = current.searchParams.get("q") ?? "";

    if (trimmed === existing) return;

    const next = new URL(window.location.href);
    if (trimmed) {
      next.searchParams.set("q", trimmed);
    } else {
      next.searchParams.delete("q");
    }
    next.searchParams.delete("page");
    router.replace(next.pathname + (next.search ? next.search : ""), {
      scroll: false,
    });
  }, [debouncedQuery, router]);

  // Fetch products whenever the debounced query changes.
  const fetchRef = useRef<AbortController | null>(null);

  const runSearch = useCallback(async (query: string) => {
    fetchRef.current?.abort();
    const controller = new AbortController();
    fetchRef.current = controller;

    setSearchState({ status: "loading" });

    try {
      const data = await fetchProducts(query, controller.signal);
      
      // Cache fetched products
      data.products.forEach((p) => {
        allFetchedProducts.current.set(p.id, p);
      });

      setSearchState({
        status: "success",
        products: data.products,
        total: data.total,
      });
    } catch (error) {
      if ((error as { name?: string }).name === "AbortError") return;
      setSearchState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  }, []);

  useEffect(() => {
    // Skip the very first render if we have SSR data and the query matches.
    if (searchState.status === "idle" && debouncedQuery === initialQuery) {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    runSearch(debouncedQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  // "/" shortcut focuses the input.
  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  function handleClear() {
    setInputValue("");
    inputRef.current?.focus();
  }

  const isLoading = searchState.status === "loading";

  return (
    <div className={`w-full ${className}`}>
      {/* ── Search input ─────────────────────────────────────── */}
      <div className="mb-8">
        <label htmlFor="shop-search" className="sr-only">
          Search products
        </label>

        <div
          className={`flex h-[52px] w-full max-w-3xl items-center rounded-xl border bg-white transition-all duration-150 ${
            isFocused
              ? "border-[#123A31] shadow-[0_0_0_4px_rgba(18,58,49,0.12)]"
              : "border-[#E6E1D3] shadow-sm hover:border-[#D8D2C0]"
          }`}
        >
          {/* Left icon */}
          <div className="ml-4 shrink-0">
            {isLoading ? (
              <Loader2
                className="h-[18px] w-[18px] animate-spin text-[#B8842E]"
                aria-hidden
              />
            ) : (
              <Search
                className={`h-[18px] w-[18px] transition-colors duration-150 ${
                  isFocused ? "text-[#123A31]" : "text-[#9A9385]"
                }`}
                aria-hidden
              />
            )}
          </div>

          <input
            id="shop-search"
            ref={inputRef}
            type="search"
            name="q"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search by name, brand, category, or spelling…"
            autoComplete="off"
            enterKeyHint="search"
            aria-label="Search products"
            aria-busy={isLoading}
            className="h-full min-w-0 flex-1 bg-transparent px-3 text-[14px] text-[#1E2421] outline-none placeholder:text-[#9A9385] [&::-webkit-search-cancel-button]:appearance-none"
          />

          {/* Clear button / kbd hint */}
          {inputValue ? (
            <button
              type="button"
              onClick={handleClear}
              className="mr-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#9A9385] transition hover:bg-[#F6F4EE] hover:text-[#1E2421]"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd
              className="mr-3 hidden shrink-0 select-none items-center rounded-md border border-[#E6E1D3] bg-[#F6F4EE] px-1.5 py-0.5 font-mono text-[11px] text-[#9A9385] sm:flex"
              aria-hidden
            >
              /
            </kbd>
          )}

          {/* Animated status indicator bar */}
          {isLoading && (
            <div className="mr-3 h-1.5 w-16 overflow-hidden rounded-full bg-[#E6E1D3]">
              <div className="h-full animate-[search-progress_1.2s_ease-in-out_infinite] rounded-full bg-[#123A31]" />
            </div>
          )}
        </div>
      </div>

      {/* ── Product grid ─────────────────────────────────────── */}
      <ProductGrid
        products={displayedProducts}
        total={displayedTotal}
        isLoading={isLoading}
        error={searchState.status === "error" ? searchState.message : null}
        query={debouncedQuery}
      />
    </div>
  );
}