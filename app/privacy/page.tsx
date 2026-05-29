import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Comfi Health",
  description: "How Comfi Health collects and uses your information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] px-6 py-16">
      <article className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-600">Last updated: May 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-700">
          <p>
            Comfi Health collects information you provide at checkout (such as your email address),
            order details, and payment references processed by Paystack. Admin accounts are managed
            through Stack Auth.
          </p>
          <p>
            We use this information to fulfill orders, prevent fraud, and operate the pharmacy
            storefront. We do not sell your personal information to third parties.
          </p>
          <p>
            Payment card and mobile-money details are handled by Paystack; we do not store full
            payment credentials on our servers.
          </p>
          <p>
            For privacy requests, contact{" "}
            <a href="mailto:support@comfihealth.com" className="font-semibold text-emerald-700">
              support@comfihealth.com
            </a>
            .
          </p>
        </div>

        <Link href="/" className="mt-10 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800">
          ← Back to shop
        </Link>
      </article>
    </div>
  );
}
