export const dynamic = "force-dynamic";

import Link from "next/link";
import { HeartPulse, Pill, ShieldCheck, Truck } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SiteHeader from "@/components/SiteHeader";
import ProductCard from "@/app/components/ProductCard";
import { prisma } from "@/lib/prisma";

const categories = [
  { name: "Pain Relief", icon: Pill },
  { name: "Sexual Wellness", icon: HeartPulse },
  { name: "Vitamins", icon: ShieldCheck },
  { name: "Flu & Cold", icon: Pill },
];

async function getHomeData() {
  const [products, featuredProducts, heroSlides] = await Promise.all([
    prisma.product.findMany({
      where: { activeListing: true },
      orderBy: { createAt: "desc" },
      take: 20,
      select: {
        id: true,
        name: true,
        price: true,
        quantity: true,
        imageUrl: true,
        category: true,
        prescriptionRequired: true,
        isFeatured: true,
        featuredRank: true,
        createAt: true,
      },
    }),
    prisma.product.findMany({
      where: { activeListing: true, isFeatured: true },
      orderBy: [{ featuredRank: "asc" }, { createAt: "desc" }],
      take: 4,
      select: {
        id: true,
        name: true,
        price: true,
        quantity: true,
        imageUrl: true,
        category: true,
        prescriptionRequired: true,
        isFeatured: true,
        featuredRank: true,
        createAt: true,
      },
    }),
    prisma.heroSlide.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        title: true,
        subtitle: true,
        imageUrl: true,
        ctaText: true,
        ctaUrl: true,
      },
    }),
  ]);

  return { products, featuredProducts, heroSlides };
}


export default async function HomePage() {
  let products = [] as Awaited<ReturnType<typeof getHomeData>>["products"];
  let featuredProducts = [] as Awaited<ReturnType<typeof getHomeData>>["featuredProducts"];
  let heroSlides = [] as Awaited<ReturnType<typeof getHomeData>>["heroSlides"];
  let loadError: string | null = null;

  try {
    const data = await getHomeData();
    products = data.products;
    featuredProducts = data.featuredProducts;
    heroSlides = data.heroSlides;
  } catch (error) {
    console.error("Failed to load home data", error);
    loadError =
      error instanceof Error && error.message
        ? error.message
        : "Unable to load products right now. Please try again later.";
  }

  const displayProducts = products;
  const featuredDisplay = featuredProducts.length > 0 ? featuredProducts : displayProducts.slice(0, 4);
  const showPlaceholder = displayProducts.length === 0;

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <HeroSection slides={heroSlides} />
      </section>

      {loadError ? (
        <section className="mx-auto max-w-7xl px-6 py-6">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            <h2 className="text-xl font-semibold">Unable to load products</h2>
            <p className="mt-2 text-sm text-red-700">{loadError}</p>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <Link href="/shop-page" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={`/shop-page?q=${encodeURIComponent(category.name)}`}
                className="rounded-3xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                  <Icon className="h-7 w-7 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          </div>
          <Link href="/shop-page" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {featuredDisplay.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                  id: product.id,
                  name: product.name,
                  price: Number(product.price),
                  image: product.imageUrl,
                  category: product.category,
                  quantity: product.quantity,
                  prescriptionRequired: product.prescriptionRequired,
                }}
            />
          ))}
          {showPlaceholder ? (
            <div className="col-span-full rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">
              No products available right now.
            </div>
          ) : null}
        </div>
      </section>

      <section id="full-catalog" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Browse Our Full Catalog</h2>
          <p className="mt-4 text-lg text-gray-600">Discover all the health and wellness products we have available</p>
        </div>

        {showPlaceholder ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center text-gray-500">
            No products available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-5">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: Number(product.price),
                  image: product.imageUrl,
                  category: product.category,
                  quantity: product.quantity,
                  prescriptionRequired: product.prescriptionRequired,
                }}
              />
            ))}
          </div>
        )}
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

      <section className="border-t border-gray-200 bg-emerald-800">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Comfi Health</h2>
            <p className="mt-4 text-gray-300">Trusted online pharmacy for students and campus communities.</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/" className="hover:text-white">
                  Shop
                </Link>
              </li>
              
              <li>
                <Link href="/cart" className="hover:text-white">
                  Cart
                </Link>
              </li>
              
              <li>
                <a href="mailto:support@comfihealth.com" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
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
              <li>Join our whatsapp community</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
