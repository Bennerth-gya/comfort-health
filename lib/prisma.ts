import 'server-only'
import { PrismaClient } from '../generated/db'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const isServerless = process.env.NODE_ENV === 'production'

/**
 * Strip libpq-specific query params that the `pg` driver doesn't understand
 * (e.g. uselibpqcompat=true, sslmode=require). SSL is handled via the `ssl`
 * Pool option instead.
 */
function stripLibpqParams(url: string): string {
  try {
    const u = new URL(url)
    u.searchParams.delete('uselibpqcompat')
    u.searchParams.delete('sslmode')
    return u.toString()
  } catch {
    return url
  }
}

function createPrismaClient() {
  const rawUrl =
    process.env.DATABASE_POOL_URL ??
    process.env.DATABASE_URL ??
    process.env.DIRECT_URL

  if (!rawUrl) {
    throw new Error(
      '[prisma] No database URL found. Set DATABASE_URL in your environment.'
    )
  }

  const connectionString = stripLibpqParams(rawUrl)

  const pool = new Pool({
    connectionString,
    // Supabase requires SSL; pass it explicitly since pg doesn't parse sslmode=require.
    ssl: { rejectUnauthorized: false },
    // In serverless, cap connections low to avoid exhausting Supabase limits.
    // In dev, keep pool small — Supabase session-mode pooler has short socket
    // timeouts; too many idle connections will be silently dropped.
    max: parseInt(process.env.DB_POOL_MAX ?? (isServerless ? '2' : '3')),
    // Release idle connections after 5 s so the pool doesn't hold sockets that
    // Supabase's pooler will drop after ~10 s of inactivity.
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS ?? '5000'),
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT_MS ?? '15000'),
    // keepAlive keeps TCP alive but the pooler still has its own timeout;
    // disabled in serverless — connections are never reused across invocations.
    keepAlive: !isServerless,
    keepAliveInitialDelayMillis: isServerless ? 0 : 5_000,
    // Allow the pool to exit cleanly when the process is idle (dev only).
    allowExitOnIdle: !isServerless,
  })

  // Prevent unhandled pool errors from crashing the Next.js process
  pool.on('error', (err) => {
    console.error('[prisma pool] idle client error:', err.message)
  })

  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}