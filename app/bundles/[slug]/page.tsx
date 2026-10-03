import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Package, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import AddBundleToCartButton from "./AddBundleToCartButton";

export const revalidate = 1800;

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
    description: bundle.description ?? `A curated bundle from ComfortHealth for UMaT students.`,
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
  hostel: "Hostel Essentials",
  "first-aid": "First Aid",
  exam: "Exam Week",
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
  const savings = compareAt && compareAt > price ? compareAt - price : null;
  const savingsPct = compareAt && compareAt > price
    ? Math.round((savings! / compareAt) * 100) : null;

  const allInStock = bundle.items.every(
    (item) => item.product.quantity > 0 && item.product.activeListing
  );

  // Products to add to cart — only those in stock and not prescription-required
  const cartItems = bundle.items
    .filter((item) => item.product.quantity > 0 && item.product.activeListing && !item.product.prescriptionRequired)
    .map((item) => ({
      id: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      image: item.product.imageUrl ?? "",
      category: item.product.category,
      quantity: item.quantity,
    }));

  const WHATSAPP_RAW = process.env.NEXT_PUBLIC_PHARMACY_PHONE ?? "0537355068";
  const waIntl = WHATSAPP_RAW.startsWith("0") ? "233" + WHATSAPP_RAW.slice(1) : WHATSAPP_RAW;
  const waMessage = `Hi, I'm interested in the "${bundle.name}" bundle on ComfortHealth. Can you help me order it?`;

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      {/* Back */}
      <div className="border-b border-[#e5e7eb] bg-white px-4 py-3 md:px-6">
        <Link
          href="/bundles"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803d]"
        >
          <ArrowLeft className="h-4 w-4" />
          All Bundles
        </Link>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
        <div className="grid gap-6 md:grid-cols-[1fr_380px]">
          {/* Left: bundle info */}
          <div className="space-y-5">
            {/* Category + featured */}
            <div className="flex items-center gap-2">
              {bundle.category && (
                <span className="rounded-full bg-[#f0fdf4] px-2.5 py-0.5 text-xs font-semibold text-[#15803d]">
                  {CATEGORY_LABELS[bundle.category] ?? bundle.category}
                </span>
              )}
              {bundle.isFeatured && (
                <span className="rounded-full bg-[#0f2318] px-2.5 py-0.5 text-xs font-bold text-white">
                  Featured
                </span>
              )}
              {savingsPct && (
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                  Save {savingsPct}%
                </span>
              )}
            </div>

            {/* Bundle image or icon */}
            {bundle.imageUrl ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#f0fdf4]">
                <Image
                  src={bundle.imageUrl}
                  alt={bundle.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="flex aspect-[16/9] w-full items-center justify-center rounded-2xl bg-[#f0fdf4]">
                <Package className="h-16 w-16 text-[#15803d]/40" />
              </div>
            )}

            {/* Name + description */}
            <div>
              <h1 className="text-2xl font-bold leading-tight text-[#0f2318] md:text-3xl">
                {bundle.name}
              </h1>
              {bundle.description && (
                <p className="mt-3 text-[15px] leading-[1.7] text-gray-600">{bundle.description}</p>
              )}
            </div>

            {/* What's included */}
            <div>
              <h2 className="mb-3 text-[15px] font-bold text-[#0f2318]">What&apos;s included</h2>
              <div className="space-y-3">
                {bundle.items.map((item) => {
                  const outOfStock = item.product.quantity <= 0 || !item.product.activeListing;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white p-3"
                    >
                      {item.product.imageUrl ? (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#f0fdf4]">
                          <Image
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f0fdf4]">
                          <Package className="h-6 w-6 text-[#15803d]/40" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#0f2318]">
                          {item.product.name}
                          {item.quantity > 1 && (
                            <span className="ml-1 text-gray-400 font-normal">× {item.quantity}</span>
                          )}
                        </p>
                        {item.product.category && (
                          <p className="text-xs text-gray-400">{item.product.category}</p>
                        )}
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        {outOfStock ? (
                          <span className="text-xs font-semibold text-red-500">Out of stock</span>
                        ) : (
                          <CheckCircle className="h-4 w-4 text-[#15803d]" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: purchase panel */}
          <div className="space-y-4">
            <div className="sticky top-24 rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
              {/* Price */}
              <div className="mb-4">
                <p className="text-2xl font-bold text-[#0f2318]">
                  GHS {price.toFixed(2)}
                </p>
                {compareAt && (
                  <div className="mt-0.5 flex items-center gap-2">
                    <p className="text-sm text-gray-400 line-through">GHS {compareAt.toFixed(2)}</p>
                    {savings && (
                      <span className="text-xs font-bold text-[#15803d]">You save GHS {savings.toFixed(2)}</span>
                    )}
                  </div>
                )}
                <p className="mt-2 text-xs text-gray-500">Pay on delivery · Cash at the door</p>
              </div>

              {/* Stock notice */}
              {!allInStock && (
                <div className="mb-4 rounded-xl bg-amber-50 px-3 py-2.5 text-xs text-amber-700">
                  Some items in this bundle may be out of stock. We&apos;ll confirm availability when you place your order.
                </div>
              )}

              {/* Cart button */}
              {cartItems.length > 0 ? (
                <AddBundleToCartButton
                  items={cartItems}
                  bundleName={bundle.name}
                />
              ) : (
                <p className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500 text-center">
                  Items in this bundle require a prescription or are out of stock. Contact our pharmacist for assistance.
                </p>
              )}

              {/* WhatsApp fallback */}
              <Link
                href={`https://wa.me/${waIntl}?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#25d366] py-3 text-sm font-semibold text-[#25d366] transition hover:bg-[#f0fdf4] active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4" />
                Order via WhatsApp instead
              </Link>

              {/* Trust */}
              <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                {[
                  "Pay on delivery — cash at the door",
                  "Delivered to your hostel or campus location",
                  "Discreet packaging",
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
