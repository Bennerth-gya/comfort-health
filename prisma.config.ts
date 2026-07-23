import path from 'path'
import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'prisma/config'

loadEnvConfig(process.cwd())

const DATABASE_URL = process.env.DATABASE_URL

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  // @ts-ignore - required for prisma db push in Prisma 7
  datasource: {
    url: DATABASE_URL,
  },
  migrate: {
    async adapter(env) {
      const { Pool } = await import('pg')
      const { PrismaPg } = await import('@prisma/adapter-pg')
      const pool = new Pool({
        connectionString: env.DATABASE_URL ?? DATABASE_URL,
      })
      return new PrismaPg(pool)
    },
  },
})