export const revalidate = 300;

import Link from "next/link";
import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/app/components/ProductCard";
import SupportFab from "@/components/SupportFab";
import CommunitySection from "@/components/CommunitySection";
import HealthEducationTeaser from "@/components/HealthEducationTeaser";
import { Pill, Sparkles, ChevronRight, Heart, Bot, ArrowRight, Activity, Zap } from "lucide-react";

const popularCategories = [
  { name: "Pain Relief", href: "/shop-page?q=Pain%20Relief", icon: Pill, active: true },
  { name: "Malaria", href: "/shop-page?q=Malaria", icon: Activity, active: false },
  { name: "Vitamins", href: "/shop-page?q=Vitamins", icon: Zap, active: false },
  { name: "Sexual Health", href: "/shop-page?q=Sexual%20Health", icon: Heart, active: false },
];

const POPULAR_PRODUCTS_LIMIT = 20;

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
  href = "/shop-page",
  showViewAll = true,
}: {
  icon?: React.ElementType;
  title: string;
  subtitle?: string;
  href?: string;
  showViewAll?: boolean;
}) {
  return (
    <div className="flex items-end justify-between px-3 pb-2 pt-5 md:px-0 md:pb-3 md:pt-8">
      <div>
        <div className="flex items-center gap-2">
          {Icon ? (
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#ecfdf5] text-[#15803d]">
              <Icon className="h-3.5 w-3.5" />
            </span>
          ) : null}
          <h2 className="text-[17px] font-bold leading-tight text-[#0f2318] md:text-[22px]">
            {title}
          </h2>
        </div>
        {subtitle ? (
          <p className="mt-0.5 text-xs text-[#4d675f] md:text-sm">
            {subtitle}
          </p>
        ) : null}
      </div>
      {showViewAll ? (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#15803d] hover:underline"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      ) : null}
    </div>
  );
}

function AiHealthGuideCard() {
  return (
    <section className="px-3 pt-4 md:px-0 md:pt-6">
      <div className="mx-auto flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-br from-[#e8f5e9] via-[#e6f4ea] to-[#dcfce7] p-4 border border-emerald-200/60 text-[#0f2318] md:max-w-none md:p-6 shadow-2xs relative overflow-hidden">
        <div className="min-w-0 flex-1 z-10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#15803d] text-white shadow-sm">
              <Bot className="h-5.5 w-5.5" />
            </span>
            <div>
              <h2 className="text-base font-bold leading-tight text-[#0f2318] md:text-xl">
                Not sure what you need?
              </h2>
              <p className="mt-0.5 text-xs text-[#3b5e4f] md:text-sm max-w-md">
                Get general health information and learn when to speak with a pharmacist.
              </p>
            </div>
          </div>
          <div className="mt-3">
            <Link
              href="/ai-guide"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#15803d] px-4 text-xs font-semibold text-white transition-all duration-100 active:scale-[0.97] hover:bg-[#166534] shadow-xs"
            >
              Ask Comfort AI
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Decorative leaf background */}
        <div className="absolute right-[-10px] bottom-[-10px] opacity-15 pointer-events-none">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="#15803d">
            <path d="M50 0 C70 30, 90 50, 100 100 C50 90, 30 70, 0 50 C30 30, 50 10, 50 0 Z" />
          </svg>
        </div>
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
        <SectionTitle title="Popular Products" subtitle="" />
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-3 pb-2 md:gap-4 md:px-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-[46vw] min-w-[148px] max-w-[190px] shrink-0 snap-start md:w-[210px] md:max-w-none lg:w-[232px]"
            >
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </section>
      <section className="scroll-mt-24 md:mx-auto md:max-w-7xl md:px-6">
        <SectionTitle title="All Medicines" showViewAll={false} />
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
      take: POPULAR_PRODUCTS_LIMIT,
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
  const featuredDisplay = featuredProducts.length > 0
    ? featuredProducts
    : displayProducts.slice(0, POPULAR_PRODUCTS_LIMIT);
  const showPlaceholder = displayProducts.length === 0;

  return (
    <>
      {/* 1. Hero Section */}
      <section className="pt-2 md:mx-auto md:max-w-7xl md:px-6 md:pt-6">
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

      {/* 2. Popular Categories Section */}
      <section className="pt-2 md:mx-auto md:max-w-7xl md:px-6 md:pt-4">
        <SectionTitle
          icon={Sparkles}
          title="Popular Categories"
          subtitle="Find products and information for your health needs."
          showViewAll={false}
        />
        <div className="scrollbar-hide flex items-center gap-2.5 overflow-x-auto px-3 pb-1 pt-1 md:px-0">
          {popularCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className={`flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-xs font-semibold transition-all duration-100 active:scale-[0.97] md:h-10 ${category.active
                  ? "bg-[#15803d] text-white shadow-xs"
                  : "border border-[#d1fae5] bg-white text-[#0f2318] hover:border-[#15803d]"
                  }`}
              >
                <Icon className={`h-4 w-4 ${category.active ? "text-white" : "text-[#15803d]"}`} />
                <span>{category.name}</span>
              </Link>
            );
          })}
          <Link
            href="/shop-page"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d1fae5] bg-white text-[#15803d] hover:border-[#15803d] shadow-2xs"
            aria-label="View more categories"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 3. Popular Products Carousel */}
      <section className="pt-2 md:mx-auto md:max-w-7xl md:px-6">
        <SectionTitle
          icon={Pill}
          title="Popular Products"
          subtitle=""
          href="/shop-page"
        />
        <div
          className="scrollbar-hide flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-3 pb-2 md:gap-4 md:px-0"
          aria-label="Popular products"
        >
          {featuredDisplay.map((product, index) => (
            <div
              key={product.id}
              className="w-[46vw] min-w-[148px] max-w-[190px] shrink-0 snap-start md:w-[210px] md:max-w-none lg:w-[232px]"
            >
              <ProductCard
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
            </div>
          ))}
          {showPlaceholder ? (
            <div className="w-full shrink-0 rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-center text-sm leading-[1.5] text-gray-500">
              No products available right now.
            </div>
          ) : null}
        </div>
      </section>

      {/* 4. AI Health Guide Banner */}
      <div className="md:mx-auto md:max-w-7xl md:px-6">
        <AiHealthGuideCard />
      </div>

      {/* 5. Health Education Teaser Section */}
      <div className="md:mx-auto md:max-w-7xl md:px-6 md:pt-4 max-md:pt-4">
        <HealthEducationTeaser />
      </div>

      {/* 6. All Medicines Catalog Section */}
      {!showPlaceholder ? (
        <section id="full-catalog" className="scroll-mt-24 pt-2 md:mx-auto md:max-w-7xl md:px-6">
          <SectionTitle
            icon={Pill}
            title="All Medicines"
            subtitle="Browse all quality medicines and healthcare essentials."
            showViewAll={false}
          />
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
      <Suspense fallback={<ProductGridSkeleton />}>
        <HomeContent />
      </Suspense>

      <section className="md:mx-auto md:max-w-7xl md:px-6 mt-6">
        <CommunitySection />
      </section>

      <SupportFab />
    </div>
  );
}
