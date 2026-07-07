import SiteHeader from "@/components/SiteHeader";
import ShopSearchBar from "@/components/ShopSearchBar";
import {
  DEFAULT_SHOP_PAGE_SIZE,
  normalizeShopSearchQuery,
  searchShopProducts,
} from "@/lib/shop-products";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

interface ShopPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

function parsePage(value?: string) {
  const page = Number(value ?? "1");
  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }
  return Math.floor(page);
}

function SearchFallback() {
  return (
    <div className="h-12 w-full max-w-3xl animate-pulse rounded-xl bg-gray-100" />
  );
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const searchQuery = normalizeShopSearchQuery(params.q);
  const page = parsePage(params.page);
  const skip = (page - 1) * DEFAULT_SHOP_PAGE_SIZE;

  // Run the initial query on the server so the first paint has real data.
  const { products, total } = await searchShopProducts({
    q: searchQuery,
    limit: DEFAULT_SHOP_PAGE_SIZE,
    skip,
  });

  // Serialise Decimal → number so it can cross the RSC boundary.
  const serialisedProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    imageUrl: p.imageUrl,
    category: p.category,
    quantity: p.quantity,
    prescriptionRequired: p.prescriptionRequired,
  }));

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
          <p className="mt-2 text-gray-600">
            {searchQuery ? (
              <>
                Results for{" "}
                <span className="font-semibold text-gray-900">
                  &ldquo;{searchQuery}&rdquo;
                </span>{" "}
                — results update as you type.
              </>
            ) : (
              "Search our full catalog — results appear as you type."
            )}
          </p>
        </div>

        {/* ShopSearchBar owns both the input AND the product grid so it can
            update the grid without a full page navigation. We seed it with
            the server-rendered results to avoid a loading flash on first paint. */}
        <Suspense fallback={<SearchFallback />}>
          <ShopSearchBar
            initialQuery={searchQuery ?? ""}
            initialProducts={serialisedProducts}
            initialTotal={total}
          />
        </Suspense>
      </section>
    </div>
  );
}
