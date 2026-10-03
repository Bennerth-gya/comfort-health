import Link from "next/link";
import { HeartPulse, MessageCircle, MapPin, Clock } from "lucide-react";

const PHARMACY_PHONE = process.env.NEXT_PUBLIC_PHARMACY_PHONE ?? "0537355068";
const WHATSAPP_INTL = PHARMACY_PHONE.startsWith("0")
  ? "233" + PHARMACY_PHONE.slice(1)
  : PHARMACY_PHONE;

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[#e5e7eb] bg-[#0f2318] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#15803d]">
                <HeartPulse className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold text-white">ComfortHealth</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-[1.7] text-white/60">
              Everyday health and personal-care essentials, conveniently delivered around UMaT.
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-[#4ade80]" aria-hidden="true" />
                UMaT Campus, Tarkwa, Ghana
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-[#4ade80]" aria-hidden="true" />
                Mon – Sat: 8 AM – 8 PM · Sun: 10 AM – 4 PM
              </span>
            </div>
            <Link
              href={`https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent("Hi, I need help with ComfortHealth.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-9 items-center gap-2 rounded-full bg-[#25d366] px-4 text-sm font-semibold text-white transition hover:bg-[#1ebe5d] active:scale-[0.97]"
            >
              <MessageCircle className="h-4 w-4" fill="white" />
              Chat on WhatsApp
            </Link>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Shop</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/shop-page", label: "All Products" },
                { href: "/student-essentials", label: "Student Essentials" },
                { href: "/bundles", label: "Bundles" },
                { href: "/shop-page?collection=first-aid", label: "First Aid" },
                { href: "/shop-page?collection=personal-care", label: "Personal Care" },
                { href: "/shop-page?collection=women", label: "Women's Care" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Help</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/track-order", label: "Track Order" },
                { href: "/orders", label: "My Orders" },
                { href: "/support", label: "Pharmacist Support" },
                { href: "/ai-guide", label: "Ask Comfort AI" },
                { href: "/health", label: "Health Hub" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Company</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Delivery</h3>
              <p className="mt-2 text-sm leading-[1.6] text-white/60">
                Currently serving UMaT campus and immediate surroundings. Pay on delivery — cash at the door.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/30 sm:flex-row">
          <p>© {year} ComfortHealth. Good health. With comfort.</p>
          <p>Made for UMaT students, Tarkwa, Ghana.</p>
        </div>
      </div>
    </footer>
  );
}
