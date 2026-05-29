import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PAGE_PREFIXES = [
  "/dashboard",
  "/inventory",
  "/orders",
  "/add-products",
];

/** Stack Auth session cookies (nextjs-cookie token store). */
function hasStackSession(request: NextRequest) {
  return request.cookies.getAll().some((cookie) => {
    const name = cookie.name.toLowerCase();
    return (
      name.endsWith("-refresh-token") ||
      name.endsWith("-access-token")
    );
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = ADMIN_PAGE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (isAdminPage && !hasStackSession(request)) {
    const signIn = new URL("/sign-in", request.url);
    signIn.searchParams.set("after", pathname);
    return NextResponse.redirect(signIn);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/inventory/:path*", "/orders/:path*", "/add-products/:path*"],
};
