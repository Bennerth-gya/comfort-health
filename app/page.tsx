export const revalidate = 3600;

import Link from "next/link";
import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/app/components/ProductCard";
import SupportFab from "@/components/SupportFab";
import CommunitySection from "@/components/CommunitySection";
import HealthEducationTeaser from "@/components/HealthEducationTeaser";
import {
  BriefcaseMedical,
  Sparkles,
  ArrowRight,
  Bot,
  Package,
  Tag,
  CheckCircle,
  HeartPulse,
  BookOpen,
  MessageCircle,
} from "lucide-react";

// ── Need-based quick actions (problem-first, not category-first) ──
const studentNeeds = [
  { label: "First Aid", href: "/shop-page?q=first+aid", emoji: "🩹" },
  { label: "Personal Care", href: "/shop-page?q=personal+care", emoji: "✨" },
  { label: "Malaria", href: "/shop-page?q=malaria", emoji: "💊" },
  { label: "Pain Relief", href: "/shop-page?q=pain+relief", emoji: "🌡️" },
  { label: "Women's Care", href: "/shop-page?q=women", emoji: "🌸" },
  { label: "Vitamins", href: "/shop-page?q=vitamins", emoji: "💪" },
  { label: "Wound Care", href: "/shop-page?q=wound", emoji: "🩺" },
];

const POPULAR_PRODUCTS_LIMIT = 20;

// ── Shared section header ──────────────────────────────────────────
function SectionTitle({
  icon: Icon,
  label,
  title,
  subtitle,
  href,
  viewAllLabel = "View all",
  showViewAll = true,
}: {
  icon?: React.ElementType;
  label?: string;
  title: string;
  subtitle?: string;
  href?: string;
  viewAllLabel?: string;
  showViewAll?: boolean;
}) {
  return (
    <div className="flex items-end justify-between px-3 pb-2 pt-5 md:px-0 md:pb-3 md:pt-8">
      <div>
        {label && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#15803d] mb-1">{label}</p>
        )}
        <div className="flex items-center gap-2">
          {Icon && (
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#ecfdf5] text-[#15803d]">
              <Icon className="h-3.5 w-3.5" />
            </span>
          )}
          <h2 className="text-[17px] font-bold leading-tight text-[#0f2318] md:text-[22px]">{title}</h2>
        </div>
        {subtitle && (
          <p className="mt-0.5 text-xs text-[#4d675f] md:text-sm">{subtitle}</p>
        )}
      </div>
      {showViewAll && href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#15803d] hover:underline"
        >
          {viewAllLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

// ── AI guide card ─────────────────────────────────────────────────
function AiHealthGuideCard() {
  return (
    <section className="px-3 pt-4 md:px-0 md:pt-6">
      <div className="relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-[#e8f5e9] via-[#e6f4ea] to-[#dcfce7] p-4 text-[#0f2318] shadow-2xs md:p-6">
        <div className="relative z-10 flex items-center gap-3 min-w-0 flex-1">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#15803d] text-white shadow-sm">
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-bold leading-tight text-[#0f2318] md:text-lg">
              Not sure what you need?
            </h2>
            <p className="mt-0.5 text-xs leading-[1.5] text-[#3b5e4f] md:text-sm max-w-md">
              Describe what you&apos;re experiencing and get general health information to help you decide.
            </p>
          </div>
        </div>
        <div className="relative z-10 mt-3 ml-[52px]">
          <Link
            href="/ai-guide"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#15803d] px-4 text-xs font-semibold text-white transition-all duration-100 active:scale-[0.97] hover:bg-[#166534] shadow-xs"
          >
            Ask Comfort AI <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {/* Decorative */}
        <div className="absolute right-[-10px] bottom-[-10px] opacity-10 pointer-events-none">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="#15803d">
            <path d="M50 0 C70 30, 90 50, 100 100 C50 90, 30 70, 0 50 C30 30, 50 10, 50 0 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ── WhatsApp CTA ───────────────────────────────────────────────────
function WhatsAppCtaCard() {
  const PHARMACY_PHONE = process.env.NEXT_PUBLIC_PHARMACY_PHONE ?? "0537355068";
  const waIntl = PHARMACY_PHONE.startsWith("0") ? "233" + PHARMACY_PHONE.slice(1) : PHARMACY_PHONE;
  return (
    <section className="px-3 pt-4 md:px-0">
      <Link
        href={`https://wa.me/${waIntl}?text=${encodeURIComponent("Hi! I need help finding something on ComfortHealth.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-4 transition hover:bg-[#dcfce7] active:scale-[0.99]"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25d366]">
          <MessageCircle className="h-6 w-6 text-white" fill="white" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-[#0f2318]">Need help finding something?</p>
          <p className="text-xs text-[#15803d]">Chat with our pharmacist on WhatsApp</p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-[#15803d]" />
      </Link>
    </section>
  );
}

// ── Loading skeleton ───────────────────────────────────────────────
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

function HomePageSkeleton() {
  return (
    <div className="space-y-4 pt-2 md:mx-auto md:max-w-7xl md:px-6">
      <div className="h-40 mx-3 animate-pulse rounded-2xl bg-[#e5e7eb] md:h-80 md:mx-0" />
      <div className="px-3 md:px-0">
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Server data fetcher ────────────────────────────────────────────
async function getHomeData() {
  const { prisma } = await import("@/lib/prisma");
  const [products, featuredProducts, heroSlides, bundles] = await Promise.all([
    prisma.product.findMany({
      where: { activeListing: true },
      orderBy: { createAt: "desc" },
      select: {
        id: true, name: true, price: true, quantity: true,
        imageUrl: true, category: true, prescriptionRequired: true,
        isFeatured: true, featuredRank: true, createAt: true,
      },
    }),
    prisma.product.findMany({
      where: { activeListing: true, isFeatured: true },
      orderBy: [{ featuredRank: "asc" }, { createAt: "desc" }],
      take: POPULAR_PRODUCTS_LIMIT,
      select: {
        id: true, name: true, price: true, quantity: true,
        imageUrl: true, category: true, prescriptionRequired: true,
        isFeatured: true, featuredRank: true, createAt: true,
      },
    }),
    prisma.heroSlide.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, title: true, subtitle: true, imageUrl: true, ctaText: true, ctaUrl: true },
    }),
    prisma.bundle.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
      take: 4,
      include: {
        items: {
          orderBy: { sortOrder: "asc" },
          take: 4,
          include: { product: { select: { name: true, imageUrl: true } } },
        },
      },
    }),
  ]);

  return {
    products,
    featuredProducts,
    heroSlides,
    bundles: bundles.map((b) => ({
      ...b,
      price: Number(b.price),
      compareAt: b.compareAt ? Number(b.compareAt) : null,
    })),
  };
}

// ── Main async content ─────────────────────────────────────────────
async function HomeContent() {
  type HomeData = Awaited<ReturnType<typeof getHomeData>>;
  let products: HomeData["products"] = [];
  let featuredProducts: HomeData["featuredProducts"] = [];
  let heroSlides: HomeData["heroSlides"] = [];
  let bundles: HomeData["bundles"] = [];
  let loadError: string | null = null;

  try {
    const data = await getHomeData();
    products = data.products;
    featuredProducts = data.featuredProducts;
    heroSlides = data.heroSlides;
    bundles = data.bundles;
  } catch (error) {
    console.error("Failed to load home data", error);
    loadError = "Unable to load products right now. Please try again later.";
  }

  const featuredDisplay = featuredProducts.length > 0
    ? featuredProducts
    : products.slice(0, POPULAR_PRODUCTS_LIMIT);

  return (
    <>
      {/* 1. Hero */}
      <section className="pt-2 md:mx-auto md:max-w-7xl md:px-6 md:pt-6">
        <HeroSection slides={heroSlides} />
      </section>

      {loadError && (
        <section className="px-3 pt-3 md:mx-auto md:max-w-7xl md:px-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <p className="text-sm">{loadError}</p>
          </div>
        </section>
      )}

      {/* 2. "What do you need today?" — need-based quick actions */}
      <section className="pt-3 md:mx-auto md:max-w-7xl md:px-6 md:pt-5">
        <div className="px-3 pb-1 md:px-0">
          <p className="text-xs font-bold uppercase tracking-widest text-[#15803d]">What do you need today?</p>
        </div>
        <div
          className="scrollbar-hide flex items-center gap-2.5 overflow-x-auto px-3 py-2 md:flex-wrap md:px-0"
          aria-label="Browse by need"
        >
          {studentNeeds.map((need) => (
            <Link
              key={need.label}
              href={need.href}
              className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-[#d1fae5] bg-white px-4 text-xs font-semibold text-[#0f2318] transition hover:border-[#15803d] hover:bg-[#f0fdf4] active:scale-[0.97]"
            >
              <span>{need.emoji}</span>
              <span>{need.label}</span>
            </Link>
          ))}
          <Link
            href="/shop-page"
            className="flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-[#d1fae5] bg-white px-4 text-xs font-semibold text-[#15803d] transition hover:border-[#15803d] active:scale-[0.97]"
          >
            Browse All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>

      {/* 3. Student Bundles (if any exist) */}
      {bundles.length > 0 && (
        <section className="pt-2 md:mx-auto md:max-w-7xl md:px-6">
          <SectionTitle
            icon={Tag}
            label="Curated for Students"
            title="Student Bundles"
            subtitle="Pre-selected combinations for common student needs."
            href="/bundles"
            viewAllLabel="All bundles"
          />
          <div className="grid grid-cols-1 gap-3 px-3 sm:grid-cols-2 md:px-0">
            {bundles.map((bundle) => {
              const savings = bundle.compareAt && bundle.compareAt > bundle.price
                ? Math.round(((bundle.compareAt - bundle.price) / bundle.compareAt) * 100)
                : null;
              return (
                <Link
                  key={bundle.id}
                  href={`/bundles/${bundle.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-4 transition hover:border-[#15803d] hover:shadow-sm"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4]">
                    <Package className="h-7 w-7 text-[#15803d]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-[#0f2318] leading-snug line-clamp-1">{bundle.name}</p>
                      {savings && (
                        <span className="shrink-0 rounded-full bg-[#0f2318] px-1.5 py-0.5 text-[10px] font-bold text-white">
                          -{savings}%
                        </span>
                      )}
                    </div>
                    <ul className="mt-1 space-y-0.5">
                      {bundle.items.slice(0, 2).map((item) => (
                        <li key={item.id} className="flex items-center gap-1 text-xs text-gray-500">
                          <CheckCircle className="h-2.5 w-2.5 shrink-0 text-[#15803d]" />
                          <span className="line-clamp-1">{item.product.name}</span>
                        </li>
                      ))}
                      {bundle.items.length > 2 && (
                        <li className="text-xs text-gray-400 pl-3.5">+{bundle.items.length - 2} more</li>
                      )}
                    </ul>
                    <p className="mt-1.5 text-sm font-bold text-[#15803d]">GHS {bundle.price.toFixed(2)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition group-hover:text-[#15803d]" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Featured Products carousel */}
      {featuredDisplay.length > 0 && (
        <section className="pt-2 md:mx-auto md:max-w-7xl md:px-6">
          <SectionTitle
            icon={Sparkles}
            title="Popular Products"
            subtitle="Frequently ordered by students on campus."
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
          </div>
        </section>
      )}

      {/* 5. Student Essentials CTA banner */}
      <section className="px-3 pt-4 md:mx-auto md:max-w-7xl md:px-6 md:pt-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/student-essentials"
            className="group flex flex-col justify-between rounded-2xl border border-[#e5e7eb] bg-[#0f2318] p-5 text-white transition hover:bg-[#1a2e22]"
          >
            <BriefcaseMedical className="h-7 w-7 text-[#4ade80]" />
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#4ade80]">For UMaT Students</p>
              <p className="mt-1 text-[15px] font-bold leading-snug">Student Essentials</p>
              <p className="mt-1 text-xs text-white/60">Hostel, first aid, exam week, personal care</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#4ade80]">
              Explore <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
            </div>
          </Link>
          <Link
            href="/health"
            className="group flex flex-col justify-between rounded-2xl border border-[#e5e7eb] bg-white p-5 transition hover:border-[#15803d]"
          >
            <BookOpen className="h-7 w-7 text-[#15803d]" />
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#15803d]">Health Knowledge</p>
              <p className="mt-1 text-[15px] font-bold leading-snug text-[#0f2318]">Health Hub</p>
              <p className="mt-1 text-xs text-gray-500">Guides, articles, and health tips written for students</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#15803d]">
              Read articles <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
            </div>
          </Link>
          <Link
            href="/support"
            className="group flex flex-col justify-between rounded-2xl border border-[#e5e7eb] bg-white p-5 transition hover:border-[#15803d]"
          >
            <HeartPulse className="h-7 w-7 text-[#15803d]" />
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#15803d]">Real Help</p>
              <p className="mt-1 text-[15px] font-bold leading-snug text-[#0f2318]">Pharmacist Support</p>
              <p className="mt-1 text-xs text-gray-500">Chat directly with our pharmacist for guidance</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#15803d]">
              Start chat <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* 6. AI Guide banner */}
      <div className="md:mx-auto md:max-w-7xl md:px-6">
        <AiHealthGuideCard />
      </div>

      {/* 7. Health Education Teaser */}
      <div className="md:mx-auto md:max-w-7xl md:px-6 md:pt-4 max-md:pt-4">
        <HealthEducationTeaser />
      </div>

      {/* 8. WhatsApp CTA */}
      <div className="md:mx-auto md:max-w-7xl md:px-6">
        <WhatsAppCtaCard />
      </div>

      {/* 9. Full Catalogue */}
      {products.length > 0 && (
        <section id="full-catalog" className="scroll-mt-24 pt-2 md:mx-auto md:max-w-7xl md:px-6">
          <SectionTitle
            title="All Products"
            subtitle="Browse everything available right now."
            showViewAll={false}
          />
          <div className="grid grid-cols-2 gap-2.5 px-3 md:grid-cols-3 md:gap-4 md:px-0 lg:grid-cols-4">
            {products.map((product, index) => (
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
      )}

      {products.length === 0 && !loadError && (
        <section className="px-3 pt-6 text-center md:mx-auto md:max-w-7xl md:px-6">
          <p className="text-sm text-gray-400">No products available right now. Check back soon.</p>
        </section>
      )}
    </>
  );
}

// ── Page entry ─────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] pb-4 md:pb-10">
      <Suspense fallback={<HomePageSkeleton />}>
        <HomeContent />
      </Suspense>

      <section className="md:mx-auto md:max-w-7xl md:px-6 mt-6">
        <CommunitySection />
      </section>

      <SupportFab />
    </div>
  );
}
