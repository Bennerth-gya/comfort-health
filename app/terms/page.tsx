import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Comfi Health",
  description: "Terms for using the Comfi Health online pharmacy storefront.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] px-6 py-16">
      <article className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-950">Terms of Service</h1>
        <p className="mt-4 text-sm text-slate-600">Last updated: May 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-700">
          <p>
            By using Comfi Health you agree to purchase only products that are appropriate for your
            needs. Prescription-required items may not be sold until pharmacist review is completed.
          </p>
          <p>
            Prices and availability are confirmed at checkout. Refunds and order issues are handled
            according to our support process and applicable Ghana consumer regulations.
          </p>
          <p>
            You must provide accurate contact information so we can fulfill and deliver your order.
            Misuse of the platform, payment fraud, or attempts to circumvent stock or pricing controls
            may result in order cancellation.
          </p>
          <p>
            Questions:{" "}
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
