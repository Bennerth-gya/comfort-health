import path from 'path'
import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'prisma/config'
import { normalizePostgresSslMode } from './lib/database-url'

loadEnvConfig(process.cwd())

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
})