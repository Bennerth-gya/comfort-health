import Link from "next/link";
import { notFound } from "next/navigation";
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
  manufacturer: string | null;
  prescriptionRequired: boolean;
  quantity: number;
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

  let productDetails: ProductDetails | null = null;
  let productError: Error | null = null;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        price: true,
        imageUrl: true,
        dosage: true,
        manufacturer: true,
        prescriptionRequired: true,
        quantity: true,
      },
    });

    if (!product) {
      notFound();
    }

    productDetails = {
      ...product,
      price: parseFloat(product.price.toString()),
    };
  } catch (error) {
    console.error("Failed to load product details", error);
    productError = error instanceof Error ? error : new Error("An unexpected error occurred");
  }

  if (productDetails) {
    return <ProductDetailsClient product={productDetails} />;
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] px-6 py-20">
      <div className="mx-auto max-w-3xl rounded-4xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Unable to load product</h1>
        <p className="mt-4 text-sm text-slate-600">
          {productError?.message ?? "There was an issue connecting to the product database. Please try again later."}
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
