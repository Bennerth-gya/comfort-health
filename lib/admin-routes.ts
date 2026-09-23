/** Paths that require an authenticated session (see proxy.ts). */
export const ADMIN_ROUTE_PREFIXES = [
  "/dashboard",
  "/inventory",
  "/orders",
  "/add-products",
] as const;

export function isAdminPath(pathname: string) {
  return ADMIN_ROUTE_PREFIXES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function isAuthPath(pathname: string) {
  return (
    pathname === "/sign-in" ||
    pathname.startsWith("/api/auth") ||
    isAdminPath(pathname)
  );
}
