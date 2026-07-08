import SearchPageClient, { type SearchProduct } from "@/app/search/SearchPageClient";
import {
  DEFAULT_SHOP_PAGE_SIZE,
  normalizeShopSearchQuery,
  searchShopProducts,
} from "@/lib/shop-products";

export const dynamic = "force-dynamic";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = normalizeShopSearchQuery(params.q) ?? "";
  let products: SearchProduct[] = [];
  let total = 0;
  let loadError: string | null = null;

  if (query) {
    try {
      const result = await searchShopProducts({
        q: query,
        limit: DEFAULT_SHOP_PAGE_SIZE,
      });
      products = result.products.map((product) => ({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        category: product.category,
        quantity: product.quantity,
        prescriptionRequired: product.prescriptionRequired,
      }));
      total = result.total;
    } catch (error) {
      console.error("Failed to load search results", error);
      loadError = "Unable to search products right now.";
    }
  }

  return (
    <SearchPageClient
      initialQuery={query}
      initialProducts={products}
      initialTotal={total}
      initialError={loadError}
    />
  );
}
