import path from 'path'
import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'prisma/config'
import { normalizePostgresSslMode } from './lib/database-url'

// Load environment variables from .env.local and .env
loadEnvConfig(process.cwd())

const PLACEHOLDER_DATABASE_URL =
  'postgresql://placeholder:placeholder@127.0.0.1:5432/placeholder'

function isPrismaGenerateCommand() {
  return process.argv.some(
    (arg) => arg === 'generate' || arg.endsWith('prisma')
  )
}

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL

  if (!url) {
    if (isPrismaGenerateCommand()) {
      return PLACEHOLDER_DATABASE_URL
    }
    throw new Error(
      'DATABASE_URL is not set. Please add it to your .env.local file.'
    )
  }

  // Apply SSL normalization for compatibility
  return normalizePostgresSslMode(url)
}

function getDirectUrl(): string {
  const url = process.env.DIRECT_URL || process.env.DATABASE_URL

  if (!url) {
    if (isPrismaGenerateCommand()) {
      return PLACEHOLDER_DATABASE_URL
    }
    throw new Error(
      'DIRECT_URL is not set. Please add it to your .env.local file.'
    )
  }

  return normalizePostgresSslMode(url)
}

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasourceOverrides: {
    db: {
      url: getDatabaseUrl(),
      directUrl: getDirectUrl(),
    },
  },
})
