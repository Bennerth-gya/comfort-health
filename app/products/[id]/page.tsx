import Link from "next/link";
import { notFound } from "next/navigation";
import { type DosageGuide, normalizeDosageGuide } from "@/lib/dosage-guide";
import { prisma } from "@/lib/prisma";
import ProductDetailsClient from "@/app/products/ProductDetailsClient";
import ProductCard from "@/app/components/ProductCard";

type ProductDetails = {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  price: number;
  imageUrl: string | null;
  dosage: string | null;
  dosageGuide: DosageGuide | null;
  manufacturer: string | null;
  expiryDate: string | null;
  prescriptionRequired: boolean;
  quantity: number;
  activeListing: boolean;
};

type RelatedProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: string | null;
  prescriptionRequired: boolean;
  quantity: number;
  activeListing: boolean;
  isFeatured: boolean;
};

export const revalidate = 86400; // revalidate once per day

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { id: true },
    take: 20,
    orderBy: { createAt: "desc" },
  });
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  let product: {
    id: string;
    name: string;
    category: string | null;
    description: string | null;
    price: { toString(): string };
    imageUrl: string | null;
    dosage: string | null;
    dosageGuide: unknown;
    manufacturer: string | null;
    expiryDate: Date | null;
    prescriptionRequired: boolean;
    quantity: number;
    activeListing: boolean;
  } | null = null;

  try {
    product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        price: true,
        imageUrl: true,
        dosage: true,
        dosageGuide: true,
        manufacturer: true,
        expiryDate: true,
        prescriptionRequired: true,
        quantity: true,
        activeListing: true,
      },
    });
  } catch (error) {
    console.error("Failed to load product details", error);
    return (
      <div className="min-h-screen bg-[#f8faf8] px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-4xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Unable to load product</h1>
          <p className="mt-4 text-sm text-slate-600">
            There was an issue connecting to the product database. Please try again later.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product || !product.activeListing) {
    notFound();
  }

  const productDetails: ProductDetails = {
    ...product,
    price: parseFloat(product.price.toString()),
    expiryDate: product.expiryDate?.toISOString() ?? null,
    dosageGuide: normalizeDosageGuide(product.dosageGuide),
  };

  // Fetch related products from the same category (exclude self)
  let relatedProducts: RelatedProduct[] = [];
  if (product.category) {
    try {
      const raw = await prisma.product.findMany({
        where: {
          category: product.category,
          id: { not: id },
          activeListing: true,
          quantity: { gt: 0 },
        },
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          category: true,
          prescriptionRequired: true,
          quantity: true,
          activeListing: true,
          isFeatured: true,
        },
        take: 6,
        orderBy: [{ isFeatured: "desc" }, { createAt: "desc" }],
      });
      relatedProducts = raw.map((p) => ({
        ...p,
        price: parseFloat(p.price.toString()),
      }));
    } catch {
      // Non-critical — just don't show related
    }
  }

  return (
    <>
      <ProductDetailsClient product={productDetails} />

      {relatedProducts.length > 0 && (
        <section className="border-t border-[#e5e7eb] bg-[#f8faf8] pb-16 pt-10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#15803d]">
                  You might also need
                </p>
                <h2 className="mt-1 text-xl font-bold text-[#0f2318]">
                  More in {product.category}
                </h2>
              </div>
              <Link
                href={`/shop-page?category=${encodeURIComponent(product.category ?? "")}`}
                className="hidden text-sm font-semibold text-[#15803d] hover:underline sm:block"
              >
                See all →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={{
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    imageUrl: p.imageUrl,
                    category: p.category,
                    prescriptionRequired: p.prescriptionRequired,
                    quantity: p.quantity,
                  }}
                />
              ))}
            </div>

            <div className="mt-6 sm:hidden">
              <Link
                href={`/shop-page?category=${encodeURIComponent(product.category ?? "")}`}
                className="block w-full rounded-xl border border-[#15803d] py-2.5 text-center text-sm font-semibold text-[#15803d]"
              >
                See all in {product.category}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
