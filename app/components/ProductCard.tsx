"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/cartContext";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
    category: string;
  };
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      ...product,
      quantity: 1,
    });
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="block overflow-hidden rounded-3xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-60 w-full overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition hover:scale-105"
          />
        </div>

        <div className="p-5">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            {product.category}
          </span>

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            {product.name}
          </h3>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-xl font-bold text-gray-900">
              GHS {product.price}
            </p>

            <button
              onClick={handleAddToCart}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}