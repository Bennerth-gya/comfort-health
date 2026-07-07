import type { Metadata } from "next";
import { Suspense } from "react";
import SignInClient from "./SignInClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-slate-600">
          Loading sign in...
        </div>
      }
    >
      <SignInClient />
    </Suspense>
  );
}
