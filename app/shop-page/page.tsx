import ShopSearchBar from "@/components/ShopSearchBar";
import { Suspense } from "react";

interface ShopPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

function SearchFallback() {
  return (
    <div className="h-12 w-full max-w-3xl animate-pulse rounded-xl bg-gray-100" />
  );
}

// No server-side DB query here — ShopSearchBar fetches products
// client-side so the page shell renders instantly (~20ms).
export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const searchQuery = (params.q ?? "").trim().slice(0, 100);

  return (
    <div className="min-h-screen bg-[#f8faf8] md:pb-10">
      <section className="px-3 py-3 md:mx-auto md:max-w-7xl md:px-6 md:py-8">
        <div className="mb-3 px-1 md:mb-6 md:px-0">
          <h1 className="text-[22px] font-bold leading-tight text-[#0f2318] md:text-3xl">
            Shop
          </h1>
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

        <Suspense fallback={<SearchFallback />}>
          <ShopSearchBar
            initialQuery={searchQuery}
            initialProducts={[]}
            initialTotal={0}
          />
        </Suspense>
      </section>
    </div>
  );
}
