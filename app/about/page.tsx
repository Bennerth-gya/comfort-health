import Link from "next/link";
import type { Metadata } from "next";
import {
  HeartPulse,
  MessageCircleHeart,
  ShieldCheck,
  Truck,
  Eye,
  Sparkles,
  Users,
  MapPin,
  Clock,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Comfort Health",
  description:
    "Comfort Health is on a mission to provide good and affordable medications at your comfort with great service. Learn about our story, vision, and values.",
};

const pillars = [
  {
    icon: HeartPulse,
    title: "Affordable Medications",
    body: "We believe cost should never be a barrier to good health. We carefully curate our catalogue to offer the best prices without compromising on quality.",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: Sparkles,
    title: "Comfort AI Guide",
    body: "Our intelligent AI assistant helps you discover the right health products from our live inventory — safely and without replacing professional advice.",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Safe",
    body: "Every product in our catalogue is carefully vetted. Orders are fulfilled with Pay on Delivery so you only pay when your package arrives.",
    color: "from-blue-500 to-cyan-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: Truck,
    title: "Great Service",
    body: "From browsing to delivery, we're with you every step. Our pharmacist support team is ready to answer questions and ensure your satisfaction.",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

const stats = [
  { label: "Products Available", value: "100+", icon: HeartPulse },
  { label: "Happy Customers", value: "100+", icon: Users },
  { label: "Active Campus", value: "UMaT", icon: MapPin },
  { label: "Support Hours/Day", value: "12 hrs", icon: Clock },
];

const values = [
  {
    title: "Accessibility",
    description: "Making healthcare products reachable for students and everyday people across Ghana.",
  },
  {
    title: "Transparency",
    description: "Clear pricing, honest product descriptions, and no hidden fees — ever.",
  },
  {
    title: "Compassion",
    description: "We treat every customer's health need with care, empathy, and respect.",
  },
  {
    title: "Innovation",
    description: "Using AI and modern technology to make health guidance smarter and safer.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-white text-[#0f2318]">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#042b1a] px-4 py-24 md:py-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-teal-400/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            <HeartPulse className="h-3.5 w-3.5" aria-hidden="true" />
            About Comfort Health
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            Good health.{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              At your comfort.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-emerald-100/80 md:text-lg">
            We&apos;re on a mission to provide good and affordable medications to
            every Ghanaian — delivered with great service, right at your doorstep.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop-page"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-emerald-500 px-7 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:bg-emerald-400 active:scale-[0.97]"
            >
              Shop Now
            </Link>
            <Link
              href="/support"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 text-sm font-bold text-white backdrop-blur transition-all duration-200 hover:bg-white/10 active:scale-[0.97]"
            >
              Talk to a Pharmacist
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────── */}
      <section className="border-b border-emerald-100 bg-[#f0fdf4] py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 md:grid-cols-4 md:gap-0 md:divide-x md:divide-emerald-100">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex flex-col items-center gap-2 px-4 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <Icon className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                </span>
                <p className="text-2xl font-extrabold text-[#042b1a] md:text-3xl">{s.value}</p>
                <p className="text-xs font-medium text-gray-500">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Vision section ─────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 md:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              Our Vision
            </span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
              Healthcare that reaches{" "}
              <span className="text-emerald-600">everyone</span>
            </h2>
            <p className="mt-5 text-base leading-8 text-gray-600">
              Our vision is to provide <strong>good and affordable medications</strong> at your
              comfort with great service. We believe that quality healthcare products should be
              within reach of every student, family, and community across Ghana — not just those
              with easy access to physical pharmacies.
            </p>
            <p className="mt-4 text-base leading-8 text-gray-600">
              Comfort Health bridges the gap between campus communities and trusted pharmacy
              services — combining a curated product catalogue, AI-powered guidance, and
              compassionate human support into one seamless experience.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#042b1a] to-[#0a4a2f] p-8 text-white shadow-2xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-emerald-400/10 blur-2xl"
            />
            <MessageCircleHeart className="h-10 w-10 text-emerald-400" aria-hidden="true" />
            <blockquote className="mt-5 text-lg font-semibold leading-relaxed">
              &ldquo;We want to be the pharmacy in your pocket — always available,
              always affordable, always caring.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-medium text-emerald-300">— The Comfort Health Team</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: "Founded", value: "2025" },
                { label: "Based In", value: "UMaT, Tarkwa" },
                { label: "Delivery", value: "Pay on Delivery" },
                { label: "AI Support", value: "24 / 7" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-white/10 p-3">
                  <p className="text-xs text-emerald-300">{item.label}</p>
                  <p className="mt-0.5 text-sm font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars ────────────────────────────────────────────── */}
      <section className="bg-[#f8faf8] px-4 py-16 md:py-24 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              What we stand for
            </span>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Built on four core pillars</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
              Every decision we make — from product selection to delivery — is guided by these principles.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.title}
                  className={`relative overflow-hidden rounded-3xl border ${p.border} ${p.bg} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color} shadow-md`}>
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#0f2318]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{p.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600">
              <HeartPulse className="h-3.5 w-3.5" aria-hidden="true" />
              Our Values
            </span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
              The heart behind everything we do
            </h2>
            <p className="mt-4 text-base leading-8 text-gray-600">
              Comfort Health was born from a simple frustration — accessing quality
              medication shouldn&apos;t be complicated, expensive, or stressful.
              We set out to change that.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-[#d1fae5] bg-[#f0fdf4] p-5 transition-all duration-200 hover:border-emerald-300 hover:bg-[#ecfdf5]"
              >
                <div className="h-1 w-8 rounded-full bg-emerald-500" />
                <h3 className="mt-3 text-sm font-bold text-[#0f2318]">{v.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-gray-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#042b1a] px-4 py-16 md:py-24 md:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-emerald-900/20 to-transparent"
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            Ready to experience{" "}
            <span className="text-emerald-400">comfortable healthcare?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-emerald-100/70">
            Browse our curated catalogue, get AI-powered product guidance, or speak
            directly with our pharmacist support team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop-page"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-emerald-500 px-7 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:bg-emerald-400 active:scale-[0.97]"
            >
              Browse Products
            </Link>
            <Link
              href="/ai-guide"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 text-sm font-bold text-white backdrop-blur transition-all duration-200 hover:bg-white/10 active:scale-[0.97]"
            >
              Ask Comfort AI
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-emerald-100/60">
            <a
              href="mailto:support@comfortHealth.com"
              className="flex items-center gap-2 transition-colors hover:text-emerald-300"
            >
              <MessageCircleHeart className="h-4 w-4" aria-hidden="true" />
              support@comfortHealth.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Ghana
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Available via Pharmacist Support
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
