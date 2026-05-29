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
    image: string | null;
    category: string | null;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { pushToast } = useToast();
  const resolvedPrice = typeof product.price === "string" ? Number(product.price) : product.price;

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(resolvedPrice) || 0,
      image: product.image ?? "",
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
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized={shouldUnoptimizeProductImage(product.image)}
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

          <h3 className="mt-4 text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="mt-4 text-xl font-bold text-gray-900">GHS {resolvedPrice.toFixed(2)}</p>
        </div>
      </Link>

      <div className="border-t border-gray-200 px-5 py-4">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
