import 'server-only'
import { PrismaClient } from '../generated/db'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const pool = new Pool({
    connectionString:
      process.env.DATABASE_POOL_URL ??
      process.env.DATABASE_URL ??
      process.env.DIRECT_URL,
    // Respect env-var tuning knobs (set in .env.local / Netlify dashboard)
    max: parseInt(process.env.DB_POOL_MAX ?? '5'),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS ?? '30000'),
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT_MS ?? '10000'),
    // Keep connections alive so the DB server doesn't drop them during idle periods
    keepAlive: true,
    keepAliveInitialDelayMillis: 10_000,
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