import 'server-only'
import { PrismaClient } from '../generated/db'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const isServerless = process.env.NODE_ENV === 'production'

function createPrismaClient() {
  const pool = new Pool({
    connectionString:
      process.env.DATABASE_POOL_URL ??
      process.env.DATABASE_URL ??
      process.env.DIRECT_URL,
    // In serverless, cap connections low to avoid exhausting Supabase limits.
    // In dev, allow more for concurrent hot-reload requests.
    max: parseInt(process.env.DB_POOL_MAX ?? (isServerless ? '2' : '5')),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS ?? '30000'),
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT_MS ?? '10000'),
    // keepAlive prevents idle-connection drops in long-running dev servers.
    // Disabled in serverless — connections aren't reused across invocations.
    keepAlive: !isServerless,
    keepAliveInitialDelayMillis: isServerless ? 0 : 10_000,
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