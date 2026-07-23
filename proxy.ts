import { NextRequest, NextResponse } from 'next/server'

// Paths that are admin-only
const ADMIN_PATHS = [
  '/dashboard',
  '/admin',
  '/inventory',
  '/orders',
  '/add-products',
  '/api/admin',
]

function isAdminPath(pathname: string): boolean {
  return ADMIN_PATHS.some(
    (adminPath) =>
      pathname === adminPath || pathname.startsWith(`${adminPath}/`),
  )
}

/**
 * Returns true when the request is coming from a local development machine.
 *
 * Two checks in order:
 *  1. NEXT_PUBLIC_IS_LOCAL env var — set in .env.local only, never on Vercel.
 *  2. The Host header — localhost / 127.0.0.1 / private LAN addresses.
 */
function isLocalRequest(request: NextRequest): boolean {
  if (process.env.NEXT_PUBLIC_IS_LOCAL === 'true') return true

  const host = request.headers.get('host') ?? ''
  return (
    host.startsWith('localhost') ||
    host.startsWith('127.0.0.1') ||
    host.startsWith('0.0.0.0') ||
    host.startsWith('192.168.')
  )
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only gate admin paths — all other routes pass through immediately.
  if (!isAdminPath(pathname)) {
    return NextResponse.next()
  }

  // On localhost (dev), let everything through — no auth friction.
  if (isLocalRequest(request)) {
    return NextResponse.next()
  }

  // ── Production: block completely unauthenticated visitors ──────────────────
  //
  // Stack Auth stores its session in a cookie whose name begins with
  // "stack-auth".  We cannot fully verify the JWT here without the SDK
  // (that happens in the page/layout via requireAdminUser), but we can at
  // least redirect visitors who have no session cookie at all.
  //
  const hasSession = [...request.cookies.getAll()].some(
    (c) => c.name.startsWith('stack-auth'),
  )

  if (!hasSession) {
    // API routes → 403 JSON; page routes → redirect to sign-in
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Session cookie present: let the request through.
  // The page/layout server components (requireAdminUser) do the final role check.
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/inventory/:path*',
    '/orders/:path*',
    '/add-products/:path*',
    '/api/admin/:path*',
  ],
}
