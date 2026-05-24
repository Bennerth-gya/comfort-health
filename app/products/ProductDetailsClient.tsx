"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/cartContext";
import {
  CheckCircle,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

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

export default function ProductDetailsClient({ product }: { product: ProductDetails }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const productFeatures = [
    product.dosage ? `Dosage: ${product.dosage}` : "Dosage not available",
    product.manufacturer ? `Manufacturer: ${product.manufacturer}` : "Trusted pharmacy",
    product.prescriptionRequired ? "Requires prescription" : "No prescription needed",
  ];

  return (
    <div className="min-h-screen bg-[#f8faf8] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between gap-4 pb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    {product.category}
                  </p>
                  <h1 className="mt-2 text-4xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                </div>
                <button className="rounded-full border border-gray-200 p-3 hover:bg-gray-100">
                  <Heart className="h-5 w-5 text-gray-700" />
                </button>
              </div>

              <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-200 text-gray-500">
                    No image available
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6">
              <p className="mb-3 text-sm font-semibold text-gray-900">
                Product Details
              </p>
              <p className="text-sm leading-7 text-gray-600">
                {product.description || "No description available."}
              </p>

              <div className="mt-6 space-y-3">
                {productFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-3xl bg-emerald-50 px-4 py-3 text-sm text-gray-700"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-gray-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="mt-2 text-4xl font-bold text-gray-900">
                    GHS {product.price.toFixed(2)}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                  <CheckCircle className="h-4 w-4" />
                  {product.quantity > 0 ? "In stock" : "Out of stock"}
                </span>
              </div>

              <div className="mt-8 space-y-6">
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Quantity</p>
                  <div className="mt-3 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-1">
                    <button
                      onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                      className="flex h-12 w-12 items-center justify-center text-xl text-gray-600 transition hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="flex min-w-15 items-center justify-center text-lg font-semibold text-gray-900">
                      {qty}
                    </div>
                    <button
                      onClick={() => setQty((prev) => prev + 1)}
                      className="flex h-12 w-12 items-center justify-center text-xl text-gray-600 transition hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: `GHS ${product.price.toFixed(2)}`,
                        image: product.imageUrl ?? "",
                        quantity: qty,
                      })
                    }
                    className="flex items-center justify-center gap-2 rounded-3xl bg-emerald-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-300/20 transition hover:bg-emerald-700"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to cart
                  </button>
                  <button className="rounded-3xl border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-gray-900 transition hover:bg-gray-50">
                    Buy Now
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Discreet Packaging Always" },
                    { label: "Fast Campus Delivery" },
                    { label: "Trusted Pharmacy Partners" },
                  ].map(({ label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-3xl border border-gray-200 bg-white px-4 py-4 text-sm text-gray-600"
                    >
                      <CheckCircle className="h-5 w-10 text-emerald-600" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
