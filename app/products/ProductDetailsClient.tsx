"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/cartContext";
import { useToast } from "@/app/context/toastContext";
import { Info, ArrowLeft, Minus, Plus, Share2, Phone } from "lucide-react";
import {
  type DosageGuide,
  dosageGuideEntries,
} from "@/lib/dosage-guide";
import { shouldUnoptimizeProductImage } from "@/lib/image-url";
import { PHARMACY_CONFIG } from "@/lib/config";

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
};

function QuantitySelector({
  qty,
  max,
  disabled,
  onChange,
  className = "",
}: {
  qty: number;
  max: number;
  disabled: boolean;
  onChange: (value: number) => void;
  className?: string;
}) {
  return (
    <div
      className={`flex h-11 min-w-[100px] items-center justify-between rounded-[10px] border border-[#e5e7eb] bg-white ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, qty - 1))}
        disabled={disabled}
        className="flex h-11 w-11 items-center justify-center text-gray-600 transition-all duration-100 active:scale-[0.97] active:bg-gray-50 disabled:text-gray-300"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="min-w-7 text-center text-sm font-bold text-[#0f2318]">
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, qty + 1))}
        disabled={disabled || qty >= max}
        className="flex h-11 w-11 items-center justify-center text-gray-600 transition-all duration-100 active:scale-[0.97] active:bg-gray-50 disabled:text-gray-300"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function ProductDetailsClient({
  product,
}: {
  product: ProductDetails;
}) {
  const { addToCart } = useCart();
  const { pushToast } = useToast();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const edgeSwipeStartX = useRef<number | null>(null);
  const isOutOfStock = product.quantity <= 0;
  const needsPrescription = product.prescriptionRequired;
  const canAddToCart = !isOutOfStock && !needsPrescription;
  const ageDosageEntries = dosageGuideEntries(product.dosageGuide);
  const categoryHref = product.category
    ? `/shop-page?q=${encodeURIComponent(product.category)}`
    : "/shop-page";

  const expiry = product.expiryDate
    ? new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(new Date(product.expiryDate))
    : "Not listed";
  const detailRows = [
    { label: "Dosage", value: product.dosage ?? "Ask a pharmacist" },
    { label: "Manufacturer", value: product.manufacturer ?? "Trusted pharmacy partner" },
    { label: "Expiry", value: expiry },
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

  const addSelectedQuantity = () => {
    if (guardCartAction()) {
      return false;
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
    return true;
  };

  const handleBuyNow = () => {
    if (addSelectedQuantity()) {
      router.push("/cart");
    }
  };

  async function handleShare() {
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `View ${product.name} on Comfort Health`,
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard?.writeText(shareUrl);
      pushToast({
        title: "Link copied",
        description: "Product link copied to clipboard.",
        variant: "success",
      });
    } catch (error) {
      if ((error as { name?: string }).name !== "AbortError") {
        pushToast({
          title: "Share unavailable",
          description: "Please try again in a moment.",
          variant: "info",
        });
      }
    }
  }

  return (
    <div
      className="min-h-dvh bg-[#f8faf8] text-[#0f2318] md:px-6 md:py-8"
      onTouchStart={(event) => {
        const startX = event.touches[0]?.clientX ?? null;
        edgeSwipeStartX.current = startX !== null && startX < 30 ? startX : null;
      }}
      onTouchEnd={(event) => {
        const startX = edgeSwipeStartX.current;
        const endX = event.changedTouches[0]?.clientX ?? null;
        edgeSwipeStartX.current = null;

        if (startX !== null && endX !== null && endX - startX > 80) {
          router.back();
        }
      }}
    >
      <div className="mx-auto md:grid md:max-w-7xl md:grid-cols-[55fr_45fr] md:gap-8">
        <section className="relative md:min-w-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 md:h-[480px] md:rounded-2xl">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover"
                unoptimized={shouldUnoptimizeProductImage(product.imageUrl)}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-200 text-sm text-gray-500">
                No image available
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="absolute left-3 top-[calc(12px+env(safe-area-inset-top,0px))] flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0f2318] shadow-md transition-all duration-100 active:scale-[0.97] active:opacity-90 md:hidden"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => void handleShare()}
            aria-label="Share product"
            className="absolute right-3 top-[calc(12px+env(safe-area-inset-top,0px))] flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0f2318] shadow-md transition-all duration-100 active:scale-[0.97] active:opacity-90 md:hidden"
          >
            <Share2 className="h-5 w-5" aria-hidden="true" />
          </button>
        </section>

        <section className="px-4 py-5 md:sticky md:top-24 md:self-start md:px-0 md:py-0">
          <nav className="mb-4 hidden text-xs text-gray-500 md:block" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#15803d]">Home</Link>
            <span className="mx-2">/</span>
            <Link href={categoryHref} className="hover:text-[#15803d]">
              {product.category ?? "Shop"}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{product.name}</span>
          </nav>

          <span className="inline-flex rounded-full bg-[#f0fdf4] px-3 py-1 text-xs font-semibold text-[#15803d]">
            {product.category ?? "Uncategorized"}
          </span>
          <h1 className="mt-1.5 text-[22px] font-bold leading-tight text-[#0f2318] md:text-[28px]">
            {product.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <p className="text-2xl font-bold leading-tight text-[#15803d] md:text-[30px]">
              GHS {product.price.toFixed(2)}
            </p>
            {needsPrescription ? (
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                Prescription required
              </span>
            ) : null}
            {isOutOfStock ? (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                Out of stock
              </span>
            ) : null}
          </div>

          <p className="mt-5 text-sm leading-[1.7] text-[#4b5563] md:text-[15px]">
            {product.description || "No description available."}
          </p>

          <div className="flex items-center gap-3 bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3 my-4">
            <div className="w-9 h-9 bg-[#15803d] rounded-full flex items-center justify-center flex-shrink-0">
              <Phone size={16} color="white" />
            </div>
            <div className="flex-1">
              <p className="text-[#0f2318] text-[12px] font-[600] leading-tight">
                Not sure this is right for you?
              </p>
              <p className="text-[#15803d] text-[11px] font-[500]">
                Call our pharmacist free
              </p>
            </div>
            <a
              href="tel:0537355068"
              className="bg-[#15803d] text-white text-[11px] font-[700] px-3 py-2 rounded-lg active:scale-95 transition-all"
            >
              Call
            </a>
          </div>

          <div className="my-5 h-px bg-[#e5e7eb]" />

          <div className="divide-y divide-[#f3f4f6] rounded-2xl bg-white md:border md:border-[#e5e7eb]">
            {detailRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3">
                <span className="text-xs font-medium text-gray-500">{row.label}</span>
                <span className="text-right text-sm font-medium leading-[1.5] text-[#0f2318]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {ageDosageEntries.length > 0 ? (
            <div className="mt-5">
              <h2 className="text-[17px] font-bold text-[#0f2318]">Dosage by age</h2>
              <div className="mt-3 divide-y divide-[#f3f4f6] rounded-2xl border border-[#e5e7eb] bg-white">
                {ageDosageEntries.map((entry) => (
                  <div key={entry.key} className="px-4 py-3">
                    <p className="text-sm font-semibold text-[#0f2318]">{entry.label}</p>
                    <p className="mt-1 text-sm leading-[1.6] text-gray-600">{entry.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs leading-[1.5] text-gray-500">
                Follow the product label or pharmacist guidance before use.
              </p>
            </div>
          ) : null}

          <div className="mt-6 hidden md:block">
            <QuantitySelector
              qty={qty}
              max={product.quantity}
              disabled={!canAddToCart}
              onChange={setQty}
              className="w-[132px]"
            />
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={addSelectedQuantity}
                disabled={!canAddToCart}
                className="flex h-12 flex-1 items-center justify-center rounded-xl border-2 border-[#15803d] bg-white px-4 text-[15px] font-semibold text-[#15803d] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 md:hover:bg-emerald-50"
              >
                {needsPrescription ? "Prescription required" : isOutOfStock ? "Out of stock" : "Add to cart"}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!canAddToCart}
                className="flex h-12 flex-1 items-center justify-center rounded-xl bg-[#15803d] px-4 text-[15px] font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 md:hover:bg-[#166534]"
              >
                Buy now
              </button>
            </div>
            <div className="mt-4 flex items-center gap-1.5 rounded-lg border border-[#dcfce7] bg-[#f0fdf4] px-3 py-2.5 text-[13px] text-[#6b7280]">
              <div className="flex shrink-0 items-center justify-center h-4 w-4 rounded-full bg-[#15803d]">
                <Info size={10} color="white" strokeWidth={3} />
              </div>
              <span className="flex-1">
                Not sure if this is right for you?{" "}
                <a
                  href={`tel:${PHARMACY_CONFIG.phone}`}
                  className="font-semibold text-[#15803d] underline"
                >
                  Call our pharmacist
                </a>
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className="safe-bottom sticky bottom-0 z-30 flex gap-2 border-t border-[#e5e7eb] bg-white px-4 py-3 md:hidden">
        <QuantitySelector
          qty={qty}
          max={product.quantity}
          disabled={!canAddToCart}
          onChange={setQty}
        />
        <button
          type="button"
          onClick={addSelectedQuantity}
          disabled={!canAddToCart}
          className="flex h-11 flex-1 items-center justify-center rounded-xl border-2 border-[#15803d] bg-white px-3 text-sm font-semibold text-[#15803d] transition-all duration-100 active:scale-[0.97] active:opacity-90 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          Add to cart
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!canAddToCart}
          className="flex h-11 flex-1 items-center justify-center rounded-xl bg-[#15803d] px-3 text-sm font-bold text-white transition-all duration-100 active:scale-[0.97] active:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
        >
          Buy now
        </button>
      </div>
      <div className="px-4 pb-6 pt-2 md:hidden">
        <div className="flex items-center gap-1.5 rounded-lg border border-[#dcfce7] bg-[#f0fdf4] px-3 py-2.5 text-[13px] text-[#6b7280]">
          <div className="flex shrink-0 items-center justify-center h-4 w-4 rounded-full bg-[#15803d]">
            <Info size={10} color="white" strokeWidth={3} />
          </div>
          <span className="flex-1">
            Not sure if this is right for you?{" "}
            <a
              href={`tel:${PHARMACY_CONFIG.phone}`}
              className="font-semibold text-[#15803d] underline"
            >
              Call our pharmacist
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
