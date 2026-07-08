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
    <div className="min-h-screen bg-[#f8faf8] md:pb-10">
      <section className="px-3 py-3 md:mx-auto md:max-w-7xl md:px-6 md:py-8">
        <div className="mb-3 px-1 md:mb-6 md:px-0">
          <h1 className="text-[22px] font-bold leading-tight text-[#0f2318] md:text-3xl">Shop</h1>
          <p className="mt-1 text-sm leading-[1.5] text-gray-500">
            {searchQuery ? (
              <>
                Results for{" "}
                <span className="font-semibold text-[#0f2318]">
                  &ldquo;{searchQuery}&rdquo;
                </span>
              </>
            ) : (
              "Search the full Comfort Health catalog."
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
