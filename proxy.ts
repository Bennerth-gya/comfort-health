import { isAdminPath } from "@/lib/admin-routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
  return (
    isAdminPath(pathname) ||
    pathname === "/inventory/hero-slides" ||
    pathname.startsWith("/inventory/hero-slides/")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAdminRoute(pathname) && !hasStackSession(request)) {
    return NextResponse.redirect(new URL("/", request.url));
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
    "/inventory/hero-slides",
    "/inventory/hero-slides/:path*",
  ],
};
