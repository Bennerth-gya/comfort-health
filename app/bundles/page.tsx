import Link from "next/link";
import type { Metadata } from "next";
import { Package, ArrowRight, Tag, CheckCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Bundles | ComfortHealth",
  description: "Curated health and personal-care bundles for UMaT students. Save on essentials by getting what you need together.",
};

const CATEGORY_LABELS: Record<string, string> = {
  hostel: "Hostel Essentials",
  "first-aid": "First Aid",
  exam: "Exam Week",
  "personal-care": "Personal Care",
  women: "Women's Care",
  wellness: "Wellness",
};

async function getBundles() {
  try {
    const bundles = await prisma.bundle.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
      include: {
        items: {
          orderBy: { sortOrder: "asc" },
          include: {
            product: {
              select: { id: true, name: true, imageUrl: true, price: true, quantity: true },
            },
          },
        },
      },
    });
    return bundles.map((b) => ({
      ...b,
      price: Number(b.price),
      compareAt: b.compareAt ? Number(b.compareAt) : null,
    }));
  } catch {
    return [];
  }
}

type Bundle = Awaited<ReturnType<typeof getBundles>>[number];

function BundleCard({ bundle }: { bundle: Bundle }) {
  const savings = bundle.compareAt
    ? Math.round(((bundle.compareAt - bundle.price) / bundle.compareAt) * 100)
    : null;

  const previewProducts = bundle.items.slice(0, 4);

  return (
    <Link
      href={`/bundles/${bundle.slug}`}
      className="group flex flex-col rounded-2xl border border-[#e5e7eb] bg-white p-5 transition-all duration-200 hover:border-[#15803d] hover:shadow-md"
    >
      {/* Category + savings */}
      <div className="flex items-center justify-between gap-2">
        {bundle.category && (
          <span className="rounded-full bg-[#f0fdf4] px-2.5 py-0.5 text-xs font-semibold text-[#15803d]">
            {CATEGORY_LABELS[bundle.category] ?? bundle.category}
          </span>
        )}
        {savings && savings > 0 ? (
          <span className="rounded-full bg-[#0f2318] px-2.5 py-0.5 text-xs font-bold text-white">
            Save {savings}%
          </span>
        ) : null}
      </div>

      {/* Icon */}
      <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0fdf4]">
        <Package className="h-8 w-8 text-[#15803d]" />
      </div>

      {/* Name */}
      <h2 className="mt-4 text-[17px] font-bold leading-snug text-[#0f2318]">{bundle.name}</h2>

      {/* Description */}
      {bundle.description && (
        <p className="mt-1.5 line-clamp-2 text-sm leading-[1.6] text-gray-500">{bundle.description}</p>
      )}

      {/* Product list preview */}
      <ul className="mt-3 space-y-1">
        {previewProducts.map((item) => (
          <li key={item.id} className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle className="h-3.5 w-3.5 shrink-0 text-[#15803d]" />
            <span className="line-clamp-1">{item.product.name} {item.quantity > 1 ? `× ${item.quantity}` : ""}</span>
          </li>
        ))}
        {bundle.items.length > 4 && (
          <li className="text-xs text-gray-400 pl-5">+{bundle.items.length - 4} more items</li>
        )}
      </ul>

      {/* Price + CTA */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-lg font-bold text-[#0f2318]">GHS {bundle.price.toFixed(2)}</p>
          {bundle.compareAt && (
            <p className="text-xs text-gray-400 line-through">GHS {bundle.compareAt.toFixed(2)}</p>
          )}
        </div>
        <span className="inline-flex items-center gap-1 rounded-xl bg-[#0f2318] px-3 py-2 text-xs font-bold text-white transition group-hover:bg-[#15803d]">
          View bundle <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default async function BundlesPage() {
  const bundles = await getBundles();
  const featured = bundles.filter((b) => b.isFeatured);
  const rest = bundles.filter((b) => !b.isFeatured);

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      {/* Hero */}
      <section className="bg-[#0f2318] px-4 py-10 md:py-14">
        <div className="mx-auto max-w-7xl md:px-6">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-4 w-4 text-[#4ade80]" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#4ade80]">Curated for Students</p>
          </div>
          <h1 className="text-2xl font-bold leading-tight text-white md:text-4xl">
            Student Bundles
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-[1.7] text-white/70 md:text-base">
            Pre-selected combinations of health and personal-care products for real student needs — hostel life, exam week, first aid, and more.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs text-white/50">
            <span>💵 Pay on Delivery</span>
            <span>🚚 Campus Delivery</span>
            <span>🔒 Private &amp; Discreet</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        {bundles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#bbf7d0] bg-white py-16 text-center">
            <Package className="mx-auto mb-4 h-10 w-10 text-[#15803d]/40" />
            <h2 className="text-lg font-bold text-[#0f2318]">Bundles coming soon</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
              We&apos;re putting together the best combinations for student life. In the meantime, browse all products.
            </p>
            <Link
              href="/shop-page"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-[#15803d] px-5 text-sm font-bold text-white"
            >
              Browse Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            {featured.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-4 text-[17px] font-bold text-[#0f2318] md:text-xl">Featured</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featured.map((b) => (
                    <BundleCard key={b.id} bundle={b} />
                  ))}
                </div>
              </section>
            )}

            {rest.length > 0 && (
              <section>
                {featured.length > 0 && (
                  <h2 className="mb-4 text-[17px] font-bold text-[#0f2318] md:text-xl">All Bundles</h2>
                )}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((b) => (
                    <BundleCard key={b.id} bundle={b} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* CTA to shop */}
        <div className="mt-10 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-6 text-center">
          <h3 className="font-bold text-[#0f2318]">Need something specific?</h3>
          <p className="mt-1 text-sm text-gray-500">Browse all products individually or ask our pharmacist for help.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/shop-page" className="inline-flex h-9 items-center gap-2 rounded-full bg-[#15803d] px-4 text-sm font-semibold text-white">
              Browse All Products
            </Link>
            <Link href="/support" className="inline-flex h-9 items-center gap-2 rounded-full border border-[#15803d] px-4 text-sm font-semibold text-[#15803d]">
              Ask Pharmacist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
