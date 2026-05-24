"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
  CheckCircle,
  Package,
  Truck,
  Store,
  Info,
  Phone,
} from "lucide-react";

const product = {
  id: 3,
  name: "Durex Extra Safe Condoms (3 pack)",
  category: "Sexual Wellness",
  price: "GHS 15.00",
  inStock: true,
  description:
    "Durex Extra Safe condoms are designed for extra confidence and reliable protection.",
  features: [
    "Extra lubricated for more comfort",
    "Easy-on shape for a better fit",
    "Nominal width: 56mm",
    "3 condoms per pack",
  ],
  images: [
    "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=600&auto=format&fit=crop",
  ],
};

export default function CartPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const prevImage = () =>
    setActiveImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );

  const nextImage = () =>
    setActiveImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-emerald-600">
            Home
          </Link>
          <span>›</span>
          <Link
            href="/category/sexual-wellness"
            className="hover:text-emerald-600"
          >
            Sexual Wellness
          </Link>
          <span>›</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[28px] border border-gray-200 bg-white p-6">
              <div className="absolute right-5 top-5 z-10 flex items-center gap-2">
                <button
                  onClick={() => setWishlisted((state) => !state)}
                  aria-label="Add to wishlist"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-red-50"
                >
                  <Heart
                    className={`h-5 w-5 transition ${
                      wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <div className="relative aspect-square rounded-3xl bg-gray-100 p-6">
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={prevImage}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-gray-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex flex-1 gap-3 overflow-hidden">
                  {product.images.map((img, index) => (
                    <button
                      key={img}
                      onClick={() => setActiveImage(index)}
                      className={`h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 bg-white p-1 transition ${
                        activeImage === index
                          ? "border-emerald-500"
                          : "border-transparent hover:border-gray-200"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className="h-full w-full rounded-xl object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
                <button
                  onClick={nextImage}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-gray-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6">
              <p className="mb-3 text-sm font-semibold text-gray-900">
                Payment & Contact
              </p>
              <p className="mb-4 text-xs text-gray-500">
                To place an order or make payment, contact us on:
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        053 735 5068
                      </p>
                      <p className="text-xs text-gray-400">(WhatsApp)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        053 735 5568
                      </p>
                      <p className="text-xs text-gray-400">(Call)</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-gray-200 bg-white p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-yellow-400 text-xs font-bold text-gray-900">
                      MTN
                    </div>
                    <p className="text-xs font-semibold text-gray-500">
                      Mobile Money (MoMo)
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">Send payment to:</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    053 735 5068
                  </p>
                  <p className="text-xs text-gray-400">Name: Comfi Health Team</p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-700">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  After payment, send your name, product and location via WhatsApp.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-4xl font-bold text-gray-900">
                {product.price}
              </p>
              {product.inStock && (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                  <CheckCircle className="h-4 w-4" />
                  In stock
                </span>
              )}
            </div>
            <p className="text-sm leading-7 text-gray-600">
              {product.description}
            </p>
            <ul className="space-y-3 text-sm text-gray-600">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <CheckCircle className="mt-1 h-4 w-4 text-emerald-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-gray-200 bg-white p-4">
              <span className="text-sm text-gray-500">Qty</span>
              <div className="flex items-center overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <button
                  onClick={() => setQty((value) => Math.max(1, value - 1))}
                  className="flex h-11 w-11 items-center justify-center text-xl text-gray-600 transition hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="flex h-11 w-14 items-center justify-center border-x border-gray-200 text-sm font-semibold text-gray-900">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((value) => value + 1)}
                  className="flex h-11 w-11 items-center justify-center text-xl text-gray-600 transition hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button className="flex items-center justify-center gap-2 rounded-3xl bg-emerald-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-300/20 transition hover:bg-emerald-700">
                <ShoppingCart className="h-5 w-5" />
                Add to cart
              </button>
              <button className="rounded-3xl border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-gray-900 transition hover:bg-emerald-700">
                Buy Now
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Package, label: "Discreet Packaging Always" },
                { icon: Truck, label: "Fast Campus Delivery" },
                { icon: Store, label: "Trusted Pharmacy Partners" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-3xl border border-gray-200 bg-white px-4 py-4 text-sm text-gray-600"
                >
                  <Icon className="h-5 w-5 text-emerald-600" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
