"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cartContext";
import { useToast } from "@/app/context/toastContext";
import { CheckCircle, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import {
  type DosageGuide,
  dosageGuideEntries,
} from "@/lib/dosage-guide";
import { shouldUnoptimizeProductImage } from "@/lib/image-url";

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
};

export default function ProductDetailsClient({
  product,
}: {
  product: ProductDetails;
}) {
  const { addToCart } = useCart();
  const { pushToast } = useToast();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const isOutOfStock = product.quantity <= 0;
  const needsPrescription = product.prescriptionRequired;
  const canAddToCart = !isOutOfStock && !needsPrescription;
  const ageDosageEntries = dosageGuideEntries(product.dosageGuide);

  const productFeatures = [
    product.dosage ? `Dosage: ${product.dosage}` : "Dosage not available",
    product.manufacturer ? `Manufacturer: ${product.manufacturer}` : "Trusted pharmacy",
    product.prescriptionRequired ? "Requires prescription" : "No prescription needed",
  ];

  const guardCartAction = () => {
    if (canAddToCart) {
      return false;
    }

    pushToast({
      title: needsPrescription ? "Prescription required" : "Out of stock",
      description: needsPrescription
        ? `${product.name} requires prescription review before checkout.`
        : `${product.name} is currently out of stock.`,
      variant: "info",
    });
    return true;
  };

  const handleAddToCart = () => {
    if (guardCartAction()) {
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.imageUrl ?? "",
      category: product.category,
      quantity: qty,
    });
    pushToast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    });
  };

  const handleBuyNow = () => {
    if (guardCartAction()) {
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.imageUrl ?? "",
      category: product.category,
      quantity: qty,
    });
    pushToast({
      title: "Ready to checkout",
      description: `We added ${product.name} to your cart.`,
      variant: "info",
    });
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between gap-4 pb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500">{product.category ?? "Uncategorized"}</p>
                  <h1 className="mt-2 text-4xl font-bold text-gray-900">{product.name}</h1>
                </div>
                <button
                  type="button"
                  className="rounded-full border border-gray-200 p-3 text-gray-700 transition hover:bg-gray-100"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-100">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized={shouldUnoptimizeProductImage(product.imageUrl)}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-200 text-gray-500">
                    No image available
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6">
              <p className="mb-3 text-sm font-semibold text-gray-900">Product Details</p>
              <p className="text-sm leading-7 text-gray-600">{product.description || "No description available."}</p>

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

              {ageDosageEntries.length > 0 ? (
                <div className="mt-6 border-t border-gray-100 pt-6">
                  <p className="text-sm font-semibold text-gray-900">
                    Dosage by age
                  </p>
                  <div className="mt-3 divide-y divide-gray-100 rounded-2xl border border-gray-200">
                    {ageDosageEntries.map((entry) => (
                      <div
                        key={entry.key}
                        className="grid gap-2 px-4 py-3 text-sm sm:grid-cols-[120px_1fr]"
                      >
                        <span className="font-semibold text-gray-900">
                          {entry.label}
                        </span>
                        <span className="leading-6 text-gray-600">
                          {entry.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-5 text-gray-500">
                    Follow the product label or pharmacist guidance before use.
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-gray-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="mt-2 text-4xl font-bold text-gray-900">GHS {product.price.toFixed(2)}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                  <CheckCircle className="h-4 w-4" />
                  {isOutOfStock ? "Out of stock" : `${product.quantity} in stock`}
                </span>
              </div>

              {needsPrescription ? (
                <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  This product requires prescription review before checkout.
                </div>
              ) : null}

              <div className="mt-8 space-y-6">
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Quantity</p>
                  <div className="mt-3 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                      disabled={!canAddToCart}
                      className="flex h-12 w-12 items-center justify-center text-xl text-gray-600 transition hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="flex min-w-14 items-center justify-center text-lg font-semibold text-gray-900">{qty}</div>
                    <button
                      type="button"
                      onClick={() => setQty((prev) => Math.min(product.quantity, prev + 1))}
                      disabled={!canAddToCart || qty >= product.quantity}
                      className="flex h-12 w-12 items-center justify-center text-xl text-gray-600 transition hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!canAddToCart}
                    className="flex items-center justify-center gap-2 rounded-3xl bg-emerald-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-300/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none"
                  >
                    <ShoppingCart className="h-5 w-5" />{" "}
                    {needsPrescription ? "Prescription Required" : isOutOfStock ? "Out of Stock" : "Add to cart"}
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={!canAddToCart}
                    className="rounded-3xl border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                  >
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
                      className="flex items-center gap-3 rounded-3xl border border-gray-200 bg-white px-4 py-4 text-sm text-gray-600"
                    >
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
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
