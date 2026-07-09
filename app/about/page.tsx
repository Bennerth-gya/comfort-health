import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HeartPulse, MessageCircleHeart, ShieldCheck, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Comfi Health",
  description: "Learn about Comfi Health, a Ghana-focused campus pharmacy storefront.",
};

const highlights = [
  {
    title: "Campus-focused care",
    body: "We make everyday pharmacy shopping easier for students and nearby communities.",
    icon: HeartPulse,
  },
  {
    title: "Guided product discovery",
    body: "Comfort AI helps shoppers find relevant in-stock products while staying within safe health guidance.",
    icon: MessageCircleHeart,
  },
  {
    title: "Secure checkout",
    body: "Payments are processed through Paystack, so sensitive payment details stay protected.",
    icon: ShieldCheck,
  },
  {
    title: "Order support",
    body: "Customers can place orders online and get clear follow-up for fulfillment and delivery.",
    icon: Truck,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-[#f8faf8] text-[#0f2318]">
      <section className="relative min-h-[360px] overflow-hidden bg-[#0f2318] md:min-h-[480px]">
        <Image
          src="/hero/black-pharmacist.jpg"
          alt="Comfi Health pharmacist helping a customer"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[#0f2318]/45" />
        <div className="relative mx-auto flex min-h-[360px] max-w-7xl flex-col justify-end px-4 pb-10 pt-16 md:min-h-[480px] md:px-6 md:pb-16">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#86efac]">
            About Comfi Health
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
            Pharmacy shopping built for everyday campus health.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#dcfce7] md:text-base">
            Comfi Health helps Ghanaian students and nearby customers browse
            wellness products, ask for safe product guidance, and checkout with
            confidence from one simple storefront.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-4 md:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-2xl border border-[#d1fae5] bg-white p-4 shadow-sm md:p-5"
              >
                <Icon className="h-6 w-6 text-[#15803d]" aria-hidden="true" />
                <h2 className="mt-4 text-base font-bold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 md:grid-cols-[minmax(0,1fr)_360px] md:px-6 md:pb-16">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">Why we exist</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600 md:text-base">
            <p>
              Buying medicine should feel clear, calm, and trustworthy. Comfi
              Health brings pharmacy products, checkout, and helpful support
              into a mobile-friendly experience for busy customers.
            </p>
            <p>
              Our catalogue focuses on active, available products, and our AI
              guide is designed to suggest products from that current inventory
              without replacing professional medical advice.
            </p>
          </div>
        </div>

        <aside className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-5">
          <h2 className="text-lg font-bold">Need help?</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Questions about products, orders, or checkout can be sent to our
            support team.
          </p>
          <a
            href="mailto:support@comfihealth.com"
            className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-[#15803d] px-4 text-sm font-bold text-white transition-all duration-100 active:scale-[0.97] active:opacity-90"
          >
            Contact support
          </a>
        </aside>
      </section>

      <section className="border-t border-[#d1fae5] bg-white px-4 py-6 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-[#0f2318]">Ready to shop?</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop-page"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[#15803d] px-4 font-bold text-white"
            >
              Browse products
            </Link>
            <Link
              href="/ai-guide"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-[#15803d] px-4 font-bold text-[#15803d]"
            >
              Ask Comfort AI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
