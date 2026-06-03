"use client";

import { SignIn, useUser } from "@stackframe/stack";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function safeRedirectPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

function stackUserEmail(user: NonNullable<ReturnType<typeof useUser>>) {
  const record = user as unknown as Record<string, unknown>;
  const primary = record.primaryEmail;

  if (typeof primary === "string") {
    return primary;
  }

  if (primary && typeof primary === "object" && "email" in primary) {
    const email = (primary as { email?: unknown }).email;
    if (typeof email === "string") {
      return email;
    }
  }

  const candidates = [record.email, record.primary_email];
  return candidates.find((value): value is string => typeof value === "string");
}

export default function SignInClient() {
  const user = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const after = safeRedirectPath(searchParams.get("after"));
  const reason = searchParams.get("reason");
  const blockedAsAdmin = reason === "not-admin";

  useEffect(() => {
    if (user && !blockedAsAdmin) {
      router.replace(after);
    }
  }, [user, after, router, blockedAsAdmin]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100 px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Admin sign in</h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to manage inventory, orders, and products.
          </p>
        </div>

        {blockedAsAdmin ? (
          <div className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <p>
              You are signed in, but this account is not on the admin allowlist.
              Update <code className="text-xs">.env.local</code>, restart{" "}
              <code className="text-xs">npm run dev</code>, then reload this page.
            </p>
            {user ? (
              <div className="space-y-1 rounded-lg bg-white/80 p-3 font-mono text-xs text-slate-800">
                <p>
                  <span className="font-sans font-medium text-slate-600">
                    ADMIN_USER_IDS=
                  </span>
                  {user.id}
                </p>
                {stackUserEmail(user) ? (
                  <p>
                    <span className="font-sans font-medium text-slate-600">
                      ADMIN_EMAILS=
                    </span>
                    {stackUserEmail(user)}
                  </p>
                ) : null}
              </div>
            ) : (
              <p>Sign in below to see the values to copy into your env file.</p>
            )}
          </div>
        ) : null}

        {!blockedAsAdmin ? <SignIn automaticRedirect /> : null}

        <div className="flex flex-col gap-2 text-center text-sm">
          {!blockedAsAdmin ? (
            <Link
              href={after}
              className="font-medium text-emerald-700 hover:text-emerald-800"
            >
              Continue to admin area
            </Link>
          ) : null}
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            Back to storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
