"use client";

import { ArrowLeft, Clock3, PackageSearch, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import { useDebounce } from "@/hooks/useDebounce";

export type SearchProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: string | null;
  quantity: number;
  prescriptionRequired: boolean;
};

type SearchPageClientProps = {
  initialQuery: string;
  initialProducts: SearchProduct[];
  initialTotal: number;
  initialError: string | null;
};

const RECENT_SEARCHES_KEY = "comfi-recent-searches";
const LIVE_SEARCH_DELAY_MS = 120;

type SearchResultsState = {
  products: SearchProduct[];
  total: number;
  error: string | null;
  isLoading: boolean;
};

type SearchResultsAction =
  | { type: "reset" }
  | { type: "start" }
  | { type: "success"; products: SearchProduct[]; total: number }
  | { type: "error"; message: string };

function searchResultsReducer(
  state: SearchResultsState,
  action: SearchResultsAction,
): SearchResultsState {
  switch (action.type) {
    case "reset":
      return { products: [], total: 0, error: null, isLoading: false };
    case "start":
      return { ...state, error: null, isLoading: true };
    case "success":
      return { products: action.products, total: action.total, error: null, isLoading: false };
    case "error":
      return { products: [], total: 0, error: action.message, isLoading: false };
    default:
      return state;
  }
}

async function fetchProducts(query: string, signal: AbortSignal) {
  const params = new URLSearchParams();
  params.set("q", query);
  params.set("limit", "48");

  const response = await fetch(`/api/products?${params.toString()}`, { signal });
  if (!response.ok) {
    throw new Error("Search failed");
  }

  return response.json() as Promise<{
    products: SearchProduct[];
    total: number;
  }>;
}

function readRecentSearches() {
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(RECENT_SEARCHES_KEY) ?? "[]",
    );
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string").slice(0, 6)
      : [];
  } catch {
    return [];
  }
}

function writeRecentSearches(items: string[]) {
  window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(items.slice(0, 6)));
}

export default function SearchPageClient({
  initialQuery,
  initialProducts,
  initialTotal,
  initialError,
}: SearchPageClientProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchRef = useRef<AbortController | null>(null);
  const [query, setQuery] = useState(initialQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => readRecentSearches());
  const [searchResults, dispatch] = useReducer(searchResultsReducer, {
    products: initialProducts,
    total: initialTotal,
    error: initialError,
    isLoading: false,
  });
  const debouncedQuery = useDebounce(query.trim(), LIVE_SEARCH_DELAY_MS);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const next = debouncedQuery.slice(0, 100);
    const current = new URL(window.location.href);

    if ((current.searchParams.get("q") ?? "") === next) {
      return;
    }

    if (next) {
      current.searchParams.set("q", next);
    } else {
      current.searchParams.delete("q");
    }

    router.replace(current.pathname + current.search, { scroll: false });
  }, [debouncedQuery, router]);

  const runSearch = useCallback((nextQuery: string) => {
    if (!nextQuery) {
      fetchRef.current?.abort();
      dispatch({ type: "reset" });
      return;
    }

    if (nextQuery === initialQuery && initialProducts.length > 0) {
      dispatch({ type: "success", products: initialProducts, total: initialTotal });
      return;
    }

    fetchRef.current?.abort();
    const controller = new AbortController();
    fetchRef.current = controller;
    dispatch({ type: "start" });

    void fetchProducts(nextQuery, controller.signal)
      .then((data) => {
        dispatch({ type: "success", products: data.products, total: data.total });
      })
      .catch((searchError) => {
        if ((searchError as { name?: string }).name === "AbortError") {
          return;
        }
        dispatch({ type: "error", message: "Unable to search products right now." });
      });
  }, [initialProducts, initialQuery, initialTotal]);

  useEffect(() => {
    runSearch(debouncedQuery);
  }, [debouncedQuery, runSearch]);

  function saveRecentSearch(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;

    setRecentSearches((current) => {
      const next = [trimmed, ...current.filter((item) => item !== trimmed)].slice(0, 6);
      writeRecentSearches(next);
      return next;
    });
  }

  function removeRecentSearch(value: string) {
    const next = recentSearches.filter((item) => item !== value);
    setRecentSearches(next);
    writeRecentSearches(next);
  }

  function submitSearch() {
    saveRecentSearch(query);
    inputRef.current?.blur();
  }

  const { products, total, error, isLoading } = searchResults;

  return (
    <div className="min-h-dvh bg-[#f8faf8] pb-6 text-[#0f2318] md:pb-10">
      <header className="safe-top sticky top-0 z-40 border-b border-[#e5e7eb] bg-[#f8faf8]/95 backdrop-blur md:hidden">
        <form
          className="flex items-center gap-2 px-3 py-2"
          onSubmit={(event) => {
            event.preventDefault();
            submitSearch();
          }}
        >
          <button
            type="button"
            aria-label="Go back"
            onClick={() => router.back()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#0f2318] transition-all duration-100 active:scale-[0.97] active:bg-emerald-50"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex h-12 min-w-0 flex-1 items-center rounded-xl border border-[#d1fae5] bg-white px-3">
            <Search className="h-[18px] w-[18px] shrink-0 text-[#15803d]" aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search through medicines..."
              enterKeyHint="search"
              className="h-full min-w-0 flex-1 bg-transparent px-2 text-base text-[#0f2318] outline-none placeholder:text-gray-400"
              aria-label="Search products"
            />
            {query ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-gray-400 transition-all duration-100 active:scale-[0.97] active:bg-gray-50"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </form>
      </header>

      <main className="px-3 pt-4 md:mx-auto md:max-w-7xl md:px-6 md:py-8">
        {!query.trim() ? (
          <section className="md:max-w-2xl">
            <h1 className="px-1 text-sm font-semibold text-[#0f2318]">
              Recent searches
            </h1>
            <div className="mt-2 overflow-hidden rounded-2xl bg-white">
              {recentSearches.length > 0 ? (
                recentSearches.map((item) => (
                  <div
                    key={item}
                    className="flex h-11 items-center border-b border-[#f3f4f6] px-3 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setQuery(item);
                        saveRecentSearch(item);
                      }}
                      className="flex h-11 min-w-0 flex-1 items-center gap-3 text-left text-sm text-[#0f2318]"
                    >
                      <Clock3 className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
                      <span className="truncate">{item}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeRecentSearch(item)}
                      className="flex h-11 w-11 items-center justify-center rounded-full text-gray-400 active:bg-gray-50"
                      aria-label={`Remove ${item}`}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="px-3 py-5 text-sm leading-[1.5] text-gray-500">
                  Your recent searches will appear here.
                </p>
              )}
            </div>
          </section>
        ) : (
          <section>
            <div className="md:grid md:grid-cols-[20%_minmax(0,1fr)] md:gap-6">
              <aside className="hidden rounded-2xl border border-[#e5e7eb] bg-white p-5 md:block md:self-start">
                <h2 className="text-sm font-bold text-[#0f2318]">Filters</h2>
                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400">Category</p>
                    <div className="mt-3 space-y-2 text-sm text-gray-600">
                      {["All", "Pain Relief", "Vitamins", "Sexual Wellness", "Flu & Cold", "First Aid"].map((item) => (
                        <label key={item} className="flex min-h-8 items-center gap-2">
                          <input type="radio" name="category" defaultChecked={item === "All"} />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400">Price range</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        min="0"
                        placeholder="Min"
                        className="h-10 rounded-lg border border-[#e5e7eb] px-3 text-sm outline-none focus:border-[#15803d]"
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="Max"
                        className="h-10 rounded-lg border border-[#e5e7eb] px-3 text-sm outline-none focus:border-[#15803d]"
                      />
                    </div>
                  </div>
                  <label className="flex min-h-11 items-center justify-between gap-3 text-sm text-gray-700">
                    Prescription required
                    <input type="checkbox" className="h-4 w-4 accent-[#15803d]" />
                  </label>
                </div>
              </aside>

              <div className="min-w-0">
                <p className="px-1 text-[13px] leading-[1.5] text-gray-500">
                  {isLoading
                    ? "Searching..."
                    : `${total} result${total === 1 ? "" : "s"} for '${query.trim()}'`}
                </p>

                {error ? (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                ) : products.length > 0 ? (
                  <div className="mt-3 grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                    {products.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        priority={index < 4}
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
                ) : !isLoading ? (
                  <div className="flex min-h-[45dvh] flex-col items-center justify-center text-center">
                    <PackageSearch className="h-10 w-10 text-gray-300" aria-hidden="true" />
                    <h2 className="mt-3 text-[17px] font-bold text-[#0f2318]">
                      No products found
                    </h2>
                    <p className="mt-1 text-sm leading-[1.5] text-gray-500">
                      Try a different name
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
