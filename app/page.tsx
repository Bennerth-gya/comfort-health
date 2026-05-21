// app/page.tsx



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

export default function HomePage() {
  const products = [
    {
      id: 1,
      name: "Panadol Extra",
      price: "GHS 12.00",
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1200&auto=format&fit=crop",
      category: "Pain Relief",
    },
    {
      id: 2,
      name: "Vitamin C 1000mg",
      price: "GHS 35.00",
      image:
        "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=1200&auto=format&fit=crop",
      category: "Vitamins",
    },
    {
      id: 3,
      name: "Durex Condom",
      price: "GHS 15.00",
      image:
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1200&auto=format&fit=crop",
      category: "Sexual Wellness",
    },
    {
      id: 4,
      name: "Cough Syrup",
      price: "GHS 18.00",
      image:
        "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=1200&auto=format&fit=crop",
      category: "Flu & Cold",
    },
  ];

  const categories = [
    {
      name: "Pain Relief",
      icon: Pill,
    },
    {
      name: "Sexual Wellness",
      icon: HeartPulse,
    },
    {
      name: "Vitamins",
      icon: ShieldCheck,
    },
    {
      name: "Flu & Cold",
      icon: Pill,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600">
              <HeartPulse className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Comfi Health
              </h1>

              <p className="text-xs text-gray-500">
                Your health, our priority
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden w-[500px] items-center rounded-xl border border-gray-200 bg-gray-50 px-4 lg:flex">
            <Search className="h-5 w-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search medicines..."
              className="h-12 w-full bg-transparent px-3 outline-none"
            />
          </div>

          {/* Actions */}
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

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <HeroSection />
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            Shop by Category
          </h2>

          <button className="text-sm font-semibold text-emerald-600">
            View all →
          </button>
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

                <h3 className="font-semibold text-gray-900">
                  {category.name}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>

          <button className="text-sm font-semibold text-emerald-600">
            View all →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-60 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition hover:scale-105"
                />
              </div>

              <div className="p-5">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  {product.category}
                </span>

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>

                <div className="mt-3 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-900">
                    {product.price}
                  </p>

                  <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-6 rounded-[40px] bg-white p-10 shadow-sm lg:grid-cols-3">
          
          <div className="flex gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
              <ShieldCheck className="h-7 w-7 text-emerald-700" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Private & Discreet
              </h3>

              <p className="mt-2 text-gray-600">
                Your privacy is fully protected with discreet packaging.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
              <Truck className="h-7 w-7 text-emerald-700" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Fast Campus Delivery
              </h3>

              <p className="mt-2 text-gray-600">
                Quick medicine delivery directly to your hostel or campus.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
              <HeartPulse className="h-7 w-7 text-emerald-700" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Genuine Products
              </h3>

              <p className="mt-2 text-gray-600">
                All medicines are sourced from trusted pharmacies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
          How It Works
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {[
            {
              title: "Choose Products",
              desc: "Browse and add medicines to your cart.",
            },
            {
              title: "Pay with MoMo",
              desc: "Make secure mobile money payment instantly.",
            },
            {
              title: "Get Delivery",
              desc: "Receive your medicines discreetly on campus.",
            },
          ].map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border border-gray-200 bg-white p-10 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white">
                {index + 1}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-4 text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-4">
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Comfi Health
            </h2>

            <p className="mt-4 text-gray-600">
              Trusted online pharmacy for students and campus communities.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>Shop</li>
              <li>Orders</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Categories
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>Pain Relief</li>
              <li>Sexual Wellness</li>
              <li>Flu & Cold</li>
              <li>Vitamins</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Contact
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>+233 55 000 0000</li>
              <li>support@comfihealth.com</li>
              <li>Tarkwa, Ghana</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}