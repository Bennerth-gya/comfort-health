import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight, BriefcaseMedical, Heart, BookOpen, Sparkles, Users, Package } from "lucide-react";
import ProductCard from "@/app/components/ProductCard";
import { prisma } from "@/lib/prisma";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Student Essentials | ComfortHealth",
  description: "Health and personal-care essentials selected for UMaT students. Hostel supplies, first-aid, exam week, and personal care — all available with campus delivery.",
};

const COLLECTIONS = [
  {
    id: "hostel",
    label: "Hostel Essentials",
    icon: Package,
    description: "Everyday health and personal-care items for day-to-day hostel life.",
    color: "#0f2318",
    bg: "#f0fdf4",
  },
  {
    id: "first-aid",
    label: "First Aid",
    icon: BriefcaseMedical,
    description: "Build your basic first-aid kit for common incidents and emergencies.",
    color: "#1e40af",
    bg: "#eff6ff",
  },
  {
    id: "exam",
    label: "Exam Week",
    icon: BookOpen,
    description: "Prepare for your busiest academic periods with the right essentials.",
    color: "#92400e",
    bg: "#fffbeb",
  },
  {
    id: "personal-care",
    label: "Personal Care",
    icon: Sparkles,
    description: "Personal hygiene and care products for everyday confidence.",
    color: "#5b21b6",
    bg: "#f5f3ff",
  },
  {
    id: "women",
    label: "Women's Care",
    icon: Users,
    description: "Personal care and wellness products for women, available discreetly.",
    color: "#9d174d",
    bg: "#fdf2f8",
  },
  {
    id: "wellness",
    label: "Wellness",
    icon: Heart,
    description: "Vitamins, supplements, and general wellness products for student life.",
    color: "#065f46",
    bg: "#ecfdf5",
  },
];

async function getStudentProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { activeListing: true, studentCollection: { not: null } },
      orderBy: [{ isFeatured: "desc" }, { createAt: "desc" }],
      take: 60,
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
        category: true,
        quantity: true,
        prescriptionRequired: true,
        studentCollection: true,
        isFeatured: true,
      },
    });
    return products.map((p) => ({ ...p, price: Number(p.price) }));
  } catch {
    return [];
  }
}

async function getBundles() {
  try {
    const bundles = await prisma.bundle.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
      take: 4,
      include: { items: { include: { product: { select: { name: true, imageUrl: true } } } } },
    });
    return bundles.map((b) => ({ ...b, price: Number(b.price), compareAt: b.compareAt ? Number(b.compareAt) : null }));
  } catch {
    return [];
  }
}

function CollectionSection({
  collection,
  products,
}: {
  collection: typeof COLLECTIONS[number];
  products: Array<{ id: string; name: string; price: number; imageUrl: string | null; category: string | null; quantity: number; prescriptionRequired: boolean; studentCollection: string | null }>;
}) {
  const Icon = collection.icon;
  if (products.length === 0) return null;

  return (
    <section id={collection.id} className="scroll-mt-28">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: collection.bg }}
          >
            <Icon className="h-5 w-5" style={{ color: collection.color }} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-[17px] font-bold text-[#0f2318] md:text-xl">{collection.label}</h2>
            <p className="text-xs text-gray-500 hidden md:block">{collection.description}</p>
          </div>
        </div>
        <Link
          href={`/shop-page?collection=${collection.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803d] hover:underline"
        >
          See all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {products.slice(0, 4).map((product, i) => (
          <ProductCard
            key={product.id}
            priority={i < 2}
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              category: product.category,
              quantity: product.quantity,
              prescriptionRequired: product.prescriptionRequired,
            }}
          />
        ))}
      </div>
    </section>
  );
}

async function PageContent() {
  const [products, bundles] = await Promise.all([getStudentProducts(), getBundles()]);

  const byCollection = Object.fromEntries(
    COLLECTIONS.map((c) => [c.id, products.filter((p) => p.studentCollection === c.id)])
  );

  const hasAnyProducts = products.length > 0;
  const hasAnyBundles = bundles.length > 0;

  return (
    <>
      {/* Quick nav */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {COLLECTIONS.map((c) => {
          const count = byCollection[c.id]?.length ?? 0;
          if (count === 0) return null;
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#e5e7eb] bg-white px-3.5 py-2 text-xs font-semibold text-[#0f2318] transition hover:border-[#15803d] hover:text-[#15803d]"
            >
              {c.label}
            </a>
          );
        })}
      </div>

      {/* Bundles strip */}
      {hasAnyBundles && (
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[17px] font-bold text-[#0f2318] md:text-xl">Student Bundles</h2>
            <Link href="/bundles" className="inline-flex items-center gap-1 text-xs font-semibold text-[#15803d] hover:underline">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {bundles.map((bundle) => (
              <Link
                key={bundle.id}
                href={`/bundles/${bundle.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-4 transition hover:border-[#15803d] hover:shadow-sm"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4]">
                  <Package className="h-7 w-7 text-[#15803d]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#0f2318] leading-snug line-clamp-1">{bundle.name}</p>
                  {bundle.description && (
                    <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">{bundle.description}</p>
                  )}
                  <p className="mt-1 text-sm font-bold text-[#15803d]">GHS {bundle.price.toFixed(2)}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 group-hover:text-[#15803d]" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Collection sections */}
      {hasAnyProducts ? (
        <div className="space-y-10">
          {COLLECTIONS.map((collection) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              products={byCollection[collection.id] ?? []}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#bbf7d0] bg-white py-16 text-center">
          <Package className="mx-auto mb-4 h-10 w-10 text-[#15803d]/40" />
          <h2 className="text-lg font-bold text-[#0f2318]">Coming soon</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
            We&apos;re curating the best student essentials. Browse all products while we set this up.
          </p>
          <Link
            href="/shop-page"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-[#15803d] px-5 text-sm font-bold text-white"
          >
            Browse Products
          </Link>
        </div>
      )}
    </>
  );
}

export default function StudentEssentialsPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8]">
      {/* Hero */}
      <section className="bg-[#0f2318] px-4 py-10 md:py-14">
        <div className="mx-auto max-w-7xl md:px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#4ade80]">UMaT Students</p>
          <h1 className="mt-2 text-2xl font-bold leading-tight text-white md:text-4xl">
            Built for student life.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-[1.7] text-white/70 md:text-base">
            Everyday health and personal-care essentials selected with UMaT students in mind.
            Delivered to your hostel.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/shop-page"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#15803d] px-5 text-sm font-semibold text-white transition hover:bg-[#166534] active:scale-[0.97]"
            >
              Shop All Products
            </Link>
            <Link
              href="/bundles"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-[0.97]"
            >
              View Bundles
            </Link>
          </div>
          {/* Trust signals */}
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/50">
            <span>🚚 UMaT Campus Delivery</span>
            <span>💵 Pay on Delivery</span>
            <span>🔒 Private Shopping</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <Suspense
          fallback={
            <div className="py-12 text-center text-sm text-gray-400">Loading essentials...</div>
          }
        >
          <PageContent />
        </Suspense>
      </div>
    </div>
  );
}
