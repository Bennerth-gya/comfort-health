import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_ROUTES = ["/dashboard", "/inventory", "/orders", "/add-products"];

/** Stack Auth session cookies (nextjs-cookie token store). */
function hasStackSession(request: NextRequest) {
  return request.cookies.getAll().some((cookie) => {
    const name = cookie.name.toLowerCase();
    const value = cookie.value?.trim();

    if (!value) return false;

    return (
      name.endsWith("-refresh-token") ||
      name.endsWith("-access-token") ||
      (name.includes("stack") &&
        (name.includes("refresh") || name.includes("access") || name.includes("token")))
    );
  });
}

function isAdminRoute(pathname: string) {
  return ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAdminRoute(pathname) && !hasStackSession(request)) {
    const signIn = new URL("/sign-in", request.url);
    signIn.searchParams.set("after", pathname);
    return NextResponse.redirect(signIn);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/inventory",
    "/inventory/:path*",
    "/orders",
    "/orders/:path*",
    "/add-products",
    "/add-products/:path*",
  ],
};
