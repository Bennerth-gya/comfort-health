"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function safeRedirectPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

export default function SignInClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const after = safeRedirectPath(
    searchParams.get("after") ?? searchParams.get("redirect"),
  );
  const reason = searchParams.get("reason");
  const blockedAsAdmin = reason === "not-admin";
  const oauthError = searchParams.get("error");
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (session?.user && !blockedAsAdmin) {
      router.replace(after);
    }
  }, [session, after, router, blockedAsAdmin]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100 px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Admin sign in</h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in with Google to manage inventory, orders, and products. New
            admins are registered automatically on their first sign in.
          </p>
        </div>

        {oauthError && !blockedAsAdmin ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
            Sign in failed ({oauthError}). Please try again.
          </p>
        ) : null}

        {blockedAsAdmin ? (
          <div className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <p>
              You are signed in, but this account does not have the{" "}
              <strong>ADMIN</strong> role. Add the email below to{" "}
              <code className="text-xs">ADMIN_EMAILS</code> in{" "}
              <code className="text-xs">.env.local</code>, restart the dev
              server, then sign in again — or promote the user in the database:
            </p>
            {session?.user ? (
              <div className="space-y-1 rounded-lg bg-white/80 p-3 font-mono text-xs text-slate-800">
                <p>
                  <span className="font-sans font-medium text-slate-600">
                    ADMIN_EMAILS=
                  </span>
                  {session.user.email}
                </p>
                <p>
                  <span className="font-sans font-medium text-slate-600">
                    -- or in SQL:
                  </span>
                  <br />
                  UPDATE users SET role = &apos;ADMIN&apos; WHERE email =
                  &apos;{session.user.email}&apos;;
                </p>
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => signOut({ redirectTo: "/sign-in" })}
              className="rounded-full border border-amber-300 px-4 py-2 text-xs font-medium text-amber-900 hover:bg-amber-100"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={isSigningIn || status === "loading"}
            onClick={() => {
              setIsSigningIn(true);
              void signIn("google", { redirectTo: after });
            }}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.58-5.17 3.58-8.82Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.09A12 12 0 0 0 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.29 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.28a12 12 0 0 0 0 10.76l4.01-3.09Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.62l4.01 3.09C6.23 6.86 8.88 4.75 12 4.75Z"
              />
            </svg>
            {isSigningIn ? "Redirecting to Google…" : "Continue with Google"}
          </button>
        )}

        <div className="flex flex-col gap-2 text-center text-sm">
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            Back to storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
