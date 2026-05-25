"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#f8faf8] px-6 py-20">
      <div className="mx-auto max-w-3xl rounded-4xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Something went wrong</h1>
        <p className="mt-4 text-sm text-slate-600">
          {error?.message ?? "An unexpected error occurred while loading the page."}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Retry
          </button>
          <Link
            href="/"
            className="inline-flex rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
