import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Package, MessageCircle, AlertCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import AddBundleToCartButton from "./AddBundleToCartButton";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const bundle = await prisma.bundle.findUnique({
    where: { slug, isActive: true },
    select: { name: true, description: true },
  });
  if (!bundle) return { title: "Bundle Not Found | ComfortHealth" };
  return {
    title: `${bundle.name} | ComfortHealth Bundles`,
    description: bundle.description ?? `A curated health bundle from ComfortHealth.`,
  };
}

async function getBundle(slug: string) {
  try {
    return await prisma.bundle.findUnique({
      where: { slug, isActive: true },
      include: {
        items: {
          orderBy: { sortOrder: "asc" },
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                imageUrl: true,
                category: true,
                quantity: true,
                description: true,
                prescriptionRequired: true,
                activeListing: true,
              },
            },
          },
        },
      },
    });
  } catch {
    return null;
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  hostel: "Daily Essentials",
  "first-aid": "First Aid",
  exam: "Focus & Energy",
  "personal-care": "Personal Care",
  women: "Women's Care",
  wellness: "Wellness",
};

export default async function BundleDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const bundle = await getBundle(slug);

  if (!bundle) notFound();

  const price = Number(bundle.price);
  const compareAt = bundle.compareAt ? Number(bundle.compareAt) : null;

  // Derive counts directly from included products
  const productCount = bundle.items.length;
  const totalUnits = bundle.items.reduce((sum, item) => sum + item.quantity, 0);

  // Sum of individual product prices (item.price * quantity)
  const individualTotal = bundle.items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  // Calculate genuine bundle savings relative to individual retail price
  const genuineSavings = individualTotal > price ? individualTotal - price : null;
  const genuineSavingsPct = genuineSavings && individualTotal > 0
    ? Math.round((genuineSavings / individualTotal) * 100)
    : null;

  // Fallback to compareAt savings if individual prices aren't higher but compareAt is configured
  const compareAtSavings = compareAt && compareAt > price ? compareAt - price : null;
  const compareAtSavingsPct = compareAtSavings && compareAt
    ? Math.round((compareAtSavings / compareAt) * 100)
    : null;

  const displaySavingsPct = genuineSavingsPct ?? compareAtSavingsPct;

  // Validate stock: each product must have enough inventory for the required bundle item quantity
  const allInStock = productCount > 0 && bundle.items.every(
    (item) => item.product.activeListing && item.product.quantity >= item.quantity
  );

  const WHATSAPP_RAW = process.env.NEXT_PUBLIC_PHARMACY_PHONE ?? "0537355068";
  const waIntl = WHATSAPP_RAW.startsWith("0") ? "233" + WHATSAPP_RAW.slice(1) : WHATSAPP_RAW;
  const waMessage = `Hi, I'm interested in the "${bundle.name}" bundle (GHS ${price.toFixed(2)}) on ComfortHealth. Can you help me order it?`;

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      {/* Breadcrumb / Back button */}
      <div className="border-b border-[#e5e7eb] bg-white px-4 py-3 md:px-6">
        <Link
          href="/bundles"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803d] hover:text-[#166534] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]"
        >
          <ArrowLeft className="h-4 w-4" />
          All Bundles
        </Link>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] md:grid-cols-[1fr_340px]">
          {/* Left: Bundle information & included products */}
          <div className="space-y-6">
            {/* Category, product count & savings badges */}
            <div className="flex flex-wrap items-center gap-2">
              {bundle.category && (
                <span className="rounded-full bg-[#f0fdf4] px-2.5 py-1 text-xs font-semibold text-[#15803d] ring-1 ring-[#15803d]/20">
                  {CATEGORY_LABELS[bundle.category] ?? bundle.category}
                </span>
              )}
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                {productCount} product{productCount !== 1 ? "s" : ""}
                {totalUnits > productCount ? ` · ${totalUnits} units` : ""}
              </span>
              {bundle.isFeatured && (
                <span className="rounded-full bg-[#0f2318] px-2.5 py-1 text-xs font-bold text-white">
                  Featured Bundle
                </span>
              )}
              {displaySavingsPct && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                  Save {displaySavingsPct}%
                </span>
              )}
            </div>

            {/* Large Cover Image with fallback */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xs border border-gray-200">
              {bundle.imageUrl ? (
                <Image
                  src={bundle.imageUrl}
                  alt={`${bundle.name} cover`}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                  priority
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0f2318] to-[#15803d] text-white">
                  <div className="text-center p-6">
                    <Package className="mx-auto h-16 w-16 opacity-75" />
                    <p className="mt-2 text-sm font-semibold opacity-90">{bundle.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bundle Title + Full Description */}
            <div>
              <h1 className="text-2xl font-bold leading-tight text-[#0f2318] md:text-3xl">
                {bundle.name}
              </h1>
              {bundle.description ? (
                <p className="mt-3 text-[15px] leading-[1.7] text-gray-700 whitespace-pre-line">
                  {bundle.description}
                </p>
              ) : (
                <p className="mt-3 text-sm text-gray-400 italic">No description provided for this bundle.</p>
              )}
            </div>

            {/* Included Products List */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0f2318]">
                  Included Products ({productCount})
                </h2>
                {individualTotal > 0 && (
                  <span className="text-xs text-gray-500">
                    Individual total: GHS {individualTotal.toFixed(2)}
                  </span>
                )}
              </div>

              {productCount === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
                  No products are currently assigned to this bundle.
                </div>
              ) : (
                <div className="space-y-3">
                  {bundle.items.map((item) => {
                    const itemPrice = Number(item.product.price);
                    const itemLinePrice = itemPrice * item.quantity;
                    const isOutOfStock =
                      !item.product.activeListing || item.product.quantity < item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3.5 rounded-xl border border-[#e5e7eb] bg-white p-3.5 transition hover:border-gray-300"
                      >
                        {/* Product Image */}
                        {item.product.imageUrl ? (
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
                            <Image
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#f0fdf4] text-[#15803d]">
                            <Package className="h-6 w-6" />
                          </div>
                        )}

                        {/* Product Details */}
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-sm text-[#0f2318] line-clamp-1">
                            {item.product.name}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            <span className="font-medium text-gray-700">
                              Qty: {item.quantity}
                            </span>
                            <span>·</span>
                            <span>GHS {itemPrice.toFixed(2)} each</span>
                            {item.quantity > 1 && (
                              <span className="text-gray-400">
                                (GHS {itemLinePrice.toFixed(2)} total)
                              </span>
                            )}
                          </div>
                          {item.product.category && (
                            <p className="mt-0.5 text-[11px] text-gray-400 capitalize">
                              {item.product.category}
                            </p>
                          )}
                        </div>

                        {/* Stock status indicator */}
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          {isOutOfStock ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600">
                              <AlertCircle className="h-3 w-3" /> Out of stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-[#15803d]">
                              <CheckCircle className="h-3.5 w-3.5" /> In stock
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: Purchase & Summary Panel */}
          <div className="space-y-4">
            <div className="sticky top-24 rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-xs">
              {/* Pricing section */}
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Bundle Price</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-3xl font-extrabold text-[#0f2318]">
                    GHS {price.toFixed(2)}
                  </p>
                </div>

                {/* Savings comparison */}
                {individualTotal > price ? (
                  <div className="mt-2 rounded-lg bg-emerald-50 p-2.5 text-xs text-emerald-800">
                    <p className="font-semibold">
                      Save GHS {(individualTotal - price).toFixed(2)} ({genuineSavingsPct}% discount)
                    </p>
                    <p className="mt-0.5 text-[11px] text-emerald-700/80">
                      If bought separately: GHS {individualTotal.toFixed(2)}
                    </p>
                  </div>
                ) : compareAt && compareAt > price ? (
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="text-gray-400 line-through">GHS {compareAt.toFixed(2)}</span>
                    <span className="font-semibold text-[#15803d]">
                      Save GHS {(compareAt - price).toFixed(2)}
                    </span>
                  </div>
                ) : null}

                <p className="mt-2 text-xs text-gray-500">Pay on delivery · Delivery available</p>
              </div>

              {/* Stock status alert */}
              {productCount > 0 && !allInStock && (
                <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                  <p className="font-semibold">Stock notice</p>
                  <p className="mt-1 text-amber-700">
                    One or more items in this bundle are currently unavailable in required quantities.
                  </p>
                </div>
              )}

              {/* Cart action */}
              <AddBundleToCartButton
                bundle={{
                  id: bundle.id,
                  name: bundle.name,
                  slug: bundle.slug,
                  price,
                  imageUrl: bundle.imageUrl,
                  category: bundle.category,
                  itemCount: productCount,
                  allInStock,
                }}
              />

              {/* WhatsApp direct order */}
              <Link
                href={`https://wa.me/${waIntl}?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#25d366] py-3 text-sm font-semibold text-[#15803d] transition hover:bg-[#f0fdf4] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366]"
              >
                <MessageCircle className="h-4 w-4 text-[#25d366]" />
                Order via WhatsApp instead
              </Link>

              {/* Trust badges */}
              <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-4">
                {[
                  "Pay on delivery — cash or MoMo at the door",
                  "Delivered to your door or chosen location",
                  "Discreet, sealed packaging",
                  "Licensed pharmacy partner backing",
                ].map((trust) => (
                  <p key={trust} className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 text-[#15803d]" />
                    {trust}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
