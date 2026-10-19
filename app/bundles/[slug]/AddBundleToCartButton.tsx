"use client";

import { useState } from "react";
import { ShoppingCart, Check, AlertCircle } from "lucide-react";
import { useCart } from "@/app/context/cartContext";
import { useToast } from "@/app/context/toastContext";
import { useRouter } from "next/navigation";

export interface BundleAddToCartData {
  id: string;
  name: string;
  slug: string;
  price: number;
  imageUrl?: string | null;
  category?: string | null;
  itemCount: number;
  allInStock: boolean;
}

interface AddBundleToCartButtonProps {
  bundle: BundleAddToCartData;
}

export default function AddBundleToCartButton({ bundle }: AddBundleToCartButtonProps) {
  const { addToCart } = useCart();
  const { pushToast } = useToast();
  const router = useRouter();
  const [done, setDone] = useState(false);

  const handleAdd = () => {
    if (!bundle.allInStock || bundle.itemCount === 0) return;

    addToCart({
      id: `bundle-${bundle.id}`,
      name: bundle.name,
      price: bundle.price,
      image: bundle.imageUrl ?? "",
      category: bundle.category ? `Bundle · ${bundle.category}` : "Bundle",
      quantity: 1,
      isBundle: true,
      bundleId: bundle.id,
      bundleSlug: bundle.slug,
    });

    setDone(true);
    pushToast({
      title: "Bundle added to cart",
      description: `${bundle.name} (GHS ${bundle.price.toFixed(2)}) has been added to your cart.`,
      variant: "success",
    });
    setTimeout(() => {
      router.push("/cart");
    }, 700);
  };

  if (bundle.itemCount === 0) {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-xs font-medium text-gray-500">
        <AlertCircle className="h-4 w-4 shrink-0 text-gray-400" />
        This bundle is being updated and currently has no items.
      </div>
    );
  }

  if (!bundle.allInStock) {
    return (
      <div className="space-y-2">
        <button
          type="button"
          disabled
          className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-200 py-3.5 text-sm font-semibold text-gray-400"
        >
          <ShoppingCart className="h-4 w-4" /> Unavailable (Stock Alert)
        </button>
        <p className="text-center text-xs text-amber-700">
          Some products in this bundle are currently out of stock.
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={done}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#15803d] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#166534] active:scale-[0.98] disabled:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] focus-visible:ring-offset-2"
    >
      {done ? (
        <>
          <Check className="h-4 w-4" /> Added — opening cart…
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" /> Add Bundle to Cart · GHS {bundle.price.toFixed(2)}
        </>
      )}
    </button>
  );
}
