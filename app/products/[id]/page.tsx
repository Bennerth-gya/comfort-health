import Link from "next/link";
import { notFound } from "next/navigation";
import { type DosageGuide, normalizeDosageGuide } from "@/lib/dosage-guide";
import { prisma } from "@/lib/prisma";
import ProductDetailsClient from "@/app/products/ProductDetailsClient";

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
  prescriptionRequired: boolean;
  quantity: number;
  activeListing: boolean;
};

export const dynamic = "force-dynamic";

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
    dosageGuide: normalizeDosageGuide(product.dosageGuide),
  };

  return <ProductDetailsClient product={productDetails} />;
}
