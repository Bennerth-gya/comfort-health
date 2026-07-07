"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { shouldUnoptimizeProductImage } from "@/lib/image-url";
import { useCart } from "@/app/context/cartContext";
import { useToast } from "@/app/context/toastContext";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: string | number;
    image?: string | null;
    imageUrl?: string | null;
    category: string | null;
    quantity?: number;
    prescriptionRequired?: boolean;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { pushToast } = useToast();
  const resolvedPrice = typeof product.price === "string" ? Number(product.price) : product.price;
  const imageSrc = product.image ?? product.imageUrl ?? null;
  const isOutOfStock = (product.quantity ?? 1) <= 0;
  const needsPrescription = product.prescriptionRequired === true;
  const canAddToCart = !isOutOfStock && !needsPrescription;
  const buttonLabel = needsPrescription
    ? "Prescription Required"
    : isOutOfStock
      ? "Out of Stock"
      : "Add to Cart";

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!canAddToCart) {
      pushToast({
        title: needsPrescription ? "Prescription required" : "Out of stock",
        description: needsPrescription
          ? `${product.name} requires prescription review before checkout.`
          : `${product.name} is currently out of stock.`,
        variant: "info",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(resolvedPrice) || 0,
      image: imageSrc ?? "",
      category: product.category,
      quantity: 1,
    });

    pushToast({
      title: "Added to cart",
      description: `${product.name} added to your cart.`,
      variant: "success",
    });
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-60 w-full overflow-hidden bg-gray-100">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              unoptimized={shouldUnoptimizeProductImage(imageSrc)}
              className="object-cover transition hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-200 text-gray-400">
              No image
            </div>
          )}
        </div>

        <div className="p-5">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          {product.category ?? "Uncategorized"}
        </span>
        {needsPrescription ? (
          <span className="ml-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
            Prescription
          </span>
        ) : null}

          <h3 className="mt-4 text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="mt-4 text-xl font-bold text-gray-900">GHS {resolvedPrice.toFixed(2)}</p>
        </div>
      </Link>

      <div className="border-t border-gray-200 px-5 py-4">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
