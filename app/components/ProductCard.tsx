"use client";

import type { MouseEvent, TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ExternalLink, Share2, ShoppingCart, Zap } from "lucide-react";
import { shouldUnoptimizeProductImage } from "@/lib/image-url";
import { useCart } from "@/app/context/cartContext";
import { useToast } from "@/app/context/toastContext";
import BottomSheet from "@/components/BottomSheet";

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
  priority?: boolean;
};

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { pushToast } = useToast();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTriggeredRef = useRef(false);
  const resolvedPrice = typeof product.price === "string" ? Number(product.price) : product.price;
  const displayPrice = Number.isFinite(resolvedPrice) ? resolvedPrice : 0;
  const imageSrc = product.image ?? product.imageUrl ?? null;
  const isOutOfStock = (product.quantity ?? 1) <= 0;
  const needsPrescription = product.prescriptionRequired === true;
  const canAddToCart = !isOutOfStock && !needsPrescription;
  const buttonLabel = needsPrescription
    ? "Prescription required"
    : isOutOfStock
      ? "Out of Stock"
      : "Add to cart";

  const addCurrentProductToCart = () => {
    if (!canAddToCart) {
      pushToast({
        title: needsPrescription ? "Prescription required" : "Out of stock",
        description: needsPrescription
          ? `${product.name} requires prescription review before checkout.`
          : `${product.name} is currently out of stock.`,
        variant: "info",
      });
      return false;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: displayPrice,
      image: imageSrc ?? "",
      category: product.category,
      quantity: 1,
    });

    pushToast({
      title: "Added to cart",
      description: `${product.name} added to your cart.`,
      variant: "success",
    });

    return true;
  };

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addCurrentProductToCart();
  };

  const handleBuyNow = () => {
    if (addCurrentProductToCart()) {
      setIsSheetOpen(false);
      router.push("/cart");
    }
  };

  const clearLongPressTimer = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    clearLongPressTimer();
    longPressTriggeredRef.current = false;
    longPressTimerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true;
      setIsSheetOpen(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    clearLongPressTimer();
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/products/${product.id}`;

    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `View ${product.name} on Comfort Health`,
        url,
      });
    } else {
      await navigator.clipboard?.writeText(url);
      pushToast({
        title: "Link copied",
        description: "Product link copied to clipboard.",
        variant: "success",
      });
    }
    setIsSheetOpen(false);
  };

  return (
    <div
      className="overflow-hidden rounded-[14px] border border-[#e5e7eb] bg-white transition-all duration-100 active:scale-[0.98] active:opacity-90 md:hover:-translate-y-0.5 md:hover:shadow-lg"
      onTouchStart={handleTouchStart}
      onTouchMove={clearLongPressTimer}
      onTouchCancel={clearLongPressTimer}
      onTouchEnd={handleTouchEnd}
    >
      <Link
        href={`/products/${product.id}`}
        className="block"
        onClick={(event) => {
          if (longPressTriggeredRef.current) {
            event.preventDefault();
            longPressTriggeredRef.current = false;
          }
        }}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-t-[14px] bg-[#f3f4f6]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              priority={priority}
              unoptimized={shouldUnoptimizeProductImage(imageSrc)}
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#f3f4f6] text-[12px] text-gray-400">
              No image
            </div>
          )}
          <span className="absolute left-2 top-2 max-w-[calc(100%-16px)] truncate rounded-full bg-white/80 px-2 py-[3px] text-[10px] font-semibold text-[#15803d] backdrop-blur">
            {product.category ?? "Uncategorized"}
          </span>
        </div>

        <div className="px-2.5 pb-0 pt-2">
          {needsPrescription ? (
            <span className="mb-1 inline-flex rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700">
              Prescription
            </span>
          ) : null}
          <h3 className="line-clamp-2 min-h-[34px] text-[13px] font-bold leading-[1.3] text-[#0f2318]">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-bold text-[#15803d]">
            GHS {displayPrice.toFixed(2)}
          </p>
        </div>
      </Link>

      <div className="px-2.5 pb-3 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className="flex h-[38px] w-full items-center justify-center rounded-[10px] bg-[#15803d] px-2 text-[13px] font-semibold text-white transition-all duration-100 active:scale-[0.97] active:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
        >
          {buttonLabel}
        </button>
      </div>

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={product.name}
      >
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => {
              if (addCurrentProductToCart()) {
                setIsSheetOpen(false);
              }
            }}
            className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold text-[#0f2318] active:bg-emerald-50"
          >
            <ShoppingCart className="h-5 w-5 text-[#15803d]" aria-hidden="true" />
            Add to cart
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold text-[#0f2318] active:bg-emerald-50"
          >
            <Zap className="h-5 w-5 text-[#15803d]" aria-hidden="true" />
            Buy now
          </button>
          <Link
            href={`/products/${product.id}`}
            onClick={() => setIsSheetOpen(false)}
            className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold text-[#0f2318] active:bg-emerald-50"
          >
            <ExternalLink className="h-5 w-5 text-[#15803d]" aria-hidden="true" />
            View details
          </Link>
          <button
            type="button"
            onClick={() => void handleShare()}
            className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold text-[#0f2318] active:bg-emerald-50"
          >
            <Share2 className="h-5 w-5 text-[#15803d]" aria-hidden="true" />
            Share product
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
