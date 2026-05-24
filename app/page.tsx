"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HeartPulse,
  Pill,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Search,
  Star,
} from "lucide-react";
import HeroSection from "./shop-page/page";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  category: string | null;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    type ApiProduct = {
      id: string;
      name: string;
      price: string | number;
      imageUrl: string | null;
      category: string | null;
    };

    const fetchProducts = async () => {
      setError(null);
      setLoading(true);

      try {
        const response = await fetch("/api/products?limit=100");
        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = (await response.json()) as { products: ApiProduct[] };
        setProducts(
          data.products.map((item) => ({
            id: item.id,
            name: item.name,
            price: Number(item.price),
            imageUrl: item.imageUrl,
            category: item.category,
          }))
        );
      } catch (fetchError) {
        console.error("Failed to fetch products:", fetchError);
        setError("Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const displayProducts = products;
  const showLoadingProducts = loading && displayProducts.length === 0;
  const showPlaceholder = !loading && displayProducts.length === 0;

  const categories = [
    { name: "Pain Relief", icon: Pill },
    { name: "Sexual Wellness", icon: HeartPulse },
    { name: "Vitamins", icon: ShieldCheck },
    { name: "Flu & Cold", icon: Pill },
  ];

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600">
              <HeartPulse className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Comfi Health</h1>
              <p className="text-xs text-gray-500">Good health with comfort</p>
            </div>
          </div>

          <div className="hidden w-125 items-center rounded-xl border border-gray-200 bg-gray-50 px-4 lg:flex">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines..."
              className="h-12 w-full bg-transparent px-3 outline-none text-gray-700"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden text-sm font-medium text-gray-600 hover:text-emerald-600 md:block">
              Orders
            </button>
            <button className="relative rounded-xl border border-gray-200 p-3 hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
                2
              </span>
            </button>
            <button className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
              Login
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <HeroSection />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <button className="text-sm font-semibold text-emerald-600">View all →</button>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="rounded-3xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                  <Icon className="h-7 w-7 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          </div>
          <button className="text-sm font-semibold text-emerald-600">View all →</button>
        </div>
        {error && !loading ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-red-700">
            {error}
          </div>
        ) : null}
        {showLoadingProducts ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center text-gray-500">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {displayProducts.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="block overflow-hidden rounded-3xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
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
                    {product.category || "Uncategorized"}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{product.name}</h3>
                  <div className="mt-3 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900">GHS {product.price.toFixed(2)}</p>
                    <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                      Add
                    </button>
                  </div>
                </div>
              </Link>
            ))}
            {showPlaceholder ? (
              <div className="col-span-full rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">
                {error ?? "No products available right now."}
              </div>
            ) : null}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Browse Our Full Catalog</h2>
          <p className="mt-4 text-lg text-gray-600">Discover all the health and wellness products we have available</p>
        </div>

        {showLoadingProducts ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center text-gray-500">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-5">
            {displayProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="block overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-200 text-gray-400">No image</div>
                  )}
                </div>
                <div className="p-4">
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                    {product.category || "Uncategorized"}
                  </span>
                  <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-gray-900">{product.name}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="font-bold text-gray-900">GHS {product.price.toFixed(2)}</p>
                    <button className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700">
                      Add
                    </button>
                  </div>
                </div>
              </Link>
            ))}
            {showPlaceholder ? (
              <div className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">
                {error ?? "No products available at the moment."}
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-12 text-center">
          <button className="rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-300/20 transition hover:bg-emerald-700">
            Load More Products
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-6 rounded-[40px] bg-white p-10 shadow-sm lg:grid-cols-3">
          <div className="flex gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
              <ShieldCheck className="h-7 w-7 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Private & Discreet</h3>
              <p className="mt-2 text-gray-600">Your privacy is fully protected with discreet packaging.</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
              <Truck className="h-7 w-7 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Fast Campus Delivery</h3>
              <p className="mt-2 text-gray-600">Quick medicine delivery directly to your hostel or campus.</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
              <HeartPulse className="h-7 w-7 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Genuine Products</h3>
              <p className="mt-2 text-gray-600">All medicines are sourced from trusted pharmacies.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {[
            { title: "Choose Products", desc: "Browse and add medicines to your cart." },
            { title: "Pay with MoMo", desc: "Make secure mobile money payment instantly." },
            { title: "Get Delivery", desc: "Receive your medicines discreetly on campus." },
          ].map((step, index) => (
            <div key={step.title} className="rounded-3xl border border-gray-200 bg-white p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white">{index + 1}</div>
              <h3 className="mt-6 text-2xl font-bold text-gray-900">{step.title}</h3>
              <p className="mt-4 text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-200 bg-emerald-800">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Comfi Health</h2>
            <p className="mt-4 text-gray-300">Trusted online pharmacy for students and campus communities.</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Shop</li>
              <li>Orders</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Categories</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Pain Relief</li>
              <li>Sexual Wellness</li>
              <li>Flu & Cold</li>
              <li>Vitamins</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-3 text-gray-300">
              <li>+233 53 735 5068</li>
              <li>support@comfihealth.com</li>
              <li>Tarkwa, Ghana</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
