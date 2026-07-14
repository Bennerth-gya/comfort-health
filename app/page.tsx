export const revalidate = 300;

import Link from "next/link";
import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/app/components/ProductCard";
import SearchBar from "@/components/SearchBar";

const categories = [
  { name: "All", href: "/" },
  { name: "Pain Relief", href: "/shop-page?q=Pain%20Relief" },
  { name: "Vitamins", href: "/shop-page?q=Vitamins" },
  { name: "Sexual Wellness", href: "/shop-page?q=Sexual%20Wellness" },
  { name: "Flu & Cold", href: "/shop-page?q=Flu%20%26%20Cold" },
  { name: "First Aid", href: "/shop-page?q=First%20Aid" },
];

function SectionHeader({
  title,
  href = "/shop-page",
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between px-3 pb-2.5 pt-4 md:px-0 md:pb-4 md:pt-8">
      <h2 className="text-[17px] font-bold leading-tight text-[#0f2318] md:text-[22px]">
        {title}
      </h2>
      <Link
        href={href}
        className="min-h-11 rounded-full px-1 py-3 text-[13px] font-medium leading-none text-[#15803d] active:opacity-70 md:hover:underline"
      >
        View all
      </Link>
    </div>
  );
}

function AiHealthGuideCard() {
  return (
    <section className="px-3 pt-3 md:px-0 md:pt-6">
      <div className="mx-auto flex min-h-[148px] items-center justify-between gap-3 rounded-2xl bg-gradient-to-br from-[#0f2318] to-[#15803d] p-4 text-white md:max-w-[900px] md:p-6">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#4ade80]">
            AI Health Guide
          </p>
          <h2 className="mt-1 text-[17px] font-bold leading-tight md:text-2xl">
            Not sure what to take?
          </h2>
          <p className="mt-1.5 max-w-[220px] text-xs leading-[1.5] text-[#86efac] md:max-w-lg md:text-sm">
            Describe your symptoms and we&apos;ll find the right product.
          </p>
          <Link
            href="/ai-guide"
            className="mt-3 inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-[13px] font-semibold text-[#15803d] transition-all duration-100 active:scale-[0.97] active:opacity-90"
          >
            Ask Comfort AI
          </Link>
        </div>
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          aria-hidden="true"
          className="shrink-0 md:h-24 md:w-24"
        >
          <rect width="60" height="60" rx="18" fill="white" fillOpacity="0.14" />
          <path
            d="M17 20.5C17 17.5 19.5 15 22.5 15H38C41 15 43.5 17.5 43.5 20.5V31C43.5 34 41 36.5 38 36.5H29L21.5 43V36.5C19 36.1 17 33.9 17 31V20.5Z"
            fill="white"
          />
          <path
            d="M30 31.5L25.5 27.4C23.4 25.5 24.7 22 27.5 22C28.6 22 29.5 22.5 30 23.3C30.5 22.5 31.4 22 32.5 22C35.3 22 36.6 25.5 34.5 27.4L30 31.5Z"
            fill="#15803d"
          />
        </svg>
      </div>
    </section>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="aspect-square skeleton" />
      <div className="p-3 space-y-2">
        <div className="h-3 skeleton rounded w-3/4" />
        <div className="h-3 skeleton rounded w-1/2" />
        <div className="h-4 skeleton rounded w-1/3 mt-1" />
        <div className="h-9 skeleton rounded-lg mt-3" />
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <>
      <section className="md:mx-auto md:max-w-7xl md:px-6">
        <SectionHeader title="Popular Products" />
        <div className="grid grid-cols-2 gap-2.5 px-3 md:grid-cols-3 md:gap-4 md:px-0 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
      <section className="scroll-mt-24 md:mx-auto md:max-w-7xl md:px-6">
        <SectionHeader title="All Medicines" />
        <div className="grid grid-cols-2 gap-2.5 px-3 md:grid-cols-3 md:gap-4 md:px-0 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </>
  );
}

async function getHomeData() {
  const { prisma } = await import("@/lib/prisma");
  const [products, featuredProducts, heroSlides] = await Promise.all([
    prisma.product.findMany({
      where: { activeListing: true },
      orderBy: { createAt: "desc" },
      take: 20,
      select: {
        id: true,
        name: true,
        price: true,
        quantity: true,
        imageUrl: true,
        category: true,
        prescriptionRequired: true,
        isFeatured: true,
        featuredRank: true,
        createAt: true,
      },
    }),
    prisma.product.findMany({
      where: { activeListing: true, isFeatured: true },
      orderBy: [{ featuredRank: "asc" }, { createAt: "desc" }],
      take: 4,
      select: {
        id: true,
        name: true,
        price: true,
        quantity: true,
        imageUrl: true,
        category: true,
        prescriptionRequired: true,
        isFeatured: true,
        featuredRank: true,
        createAt: true,
      },
    }),
    prisma.heroSlide.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        title: true,
        subtitle: true,
        imageUrl: true,
        ctaText: true,
        ctaUrl: true,
      },
    }),
  ]);

  return { products, featuredProducts, heroSlides };
}

async function HomeContent() {
  let products = [] as Awaited<ReturnType<typeof getHomeData>>["products"];
  let featuredProducts = [] as Awaited<ReturnType<typeof getHomeData>>["featuredProducts"];
  let heroSlides = [] as Awaited<ReturnType<typeof getHomeData>>["heroSlides"];
  let loadError: string | null = null;

  try {
    const data = await getHomeData();
    products = data.products;
    featuredProducts = data.featuredProducts;
    heroSlides = data.heroSlides;
  } catch (error) {
    console.error("Failed to load home data", error);
    loadError =
      error instanceof Error && error.message
        ? error.message
        : "Unable to load products right now. Please try again later.";
  }

  const displayProducts = products;
  const featuredDisplay = featuredProducts.length > 0 ? featuredProducts : displayProducts.slice(0, 4);
  const showPlaceholder = displayProducts.length === 0;

  return (
    <>
      <section className="pt-3 md:mx-auto md:max-w-7xl md:px-6 md:pt-6">
        <HeroSection slides={heroSlides} />
      </section>

      {loadError ? (
        <section className="px-3 pt-3">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <h2 className="text-[15px] font-semibold">Unable to load products</h2>
            <p className="mt-1 text-sm leading-[1.5] text-red-700">{loadError}</p>
          </div>
        </section>
      ) : null}

      <section className="pt-3 md:mx-auto md:max-w-7xl md:px-6 md:pt-5">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto px-3 pb-1 md:px-0">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className={`flex h-9 shrink-0 items-center rounded-full px-4 text-[13px] font-medium transition-all duration-100 active:scale-[0.97] active:opacity-90 md:h-10 md:hover:-translate-y-0.5 ${
                index === 0
                  ? "bg-[#15803d] text-white"
                  : "border border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <div className="md:mx-auto md:max-w-7xl md:px-6">
        <AiHealthGuideCard />
      </div>

      <section className="md:mx-auto md:max-w-7xl md:px-6">
        <SectionHeader title="Popular Products" />
        <div className="grid grid-cols-2 gap-2.5 px-3 md:grid-cols-3 md:gap-4 md:px-0 lg:grid-cols-4">
          {featuredDisplay.map((product, index) => (
            <ProductCard
              key={product.id}
              priority={index < 4}
              product={{
                id: product.id,
                name: product.name,
                price: Number(product.price),
                image: product.imageUrl,
                category: product.category,
                quantity: product.quantity,
                prescriptionRequired: product.prescriptionRequired,
              }}
            />
          ))}
          {showPlaceholder ? (
            <div className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-center text-sm leading-[1.5] text-gray-500">
              No products available right now.
            </div>
          ) : null}
        </div>
      </section>

      {!showPlaceholder ? (
        <section id="full-catalog" className="scroll-mt-24 md:mx-auto md:max-w-7xl md:px-6">
          <SectionHeader title="All Medicines" />
          <div className="grid grid-cols-2 gap-2.5 px-3 md:grid-cols-3 md:gap-4 md:px-0 lg:grid-cols-4">
            {displayProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                priority={index < 4}
                product={{
                  id: product.id,
                  name: product.name,
                  price: Number(product.price),
                  image: product.imageUrl,
                  category: product.category,
                  quantity: product.quantity,
                  prescriptionRequired: product.prescriptionRequired,
                }}
              />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] pb-4 md:pb-10">
      <section className="px-3 pt-3 md:hidden">
        <SearchBar />
      </section>
      
      <Suspense fallback={<ProductGridSkeleton />}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
