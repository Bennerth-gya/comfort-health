import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";
import { normalizePostgresSslMode } from "./lib/database-url";

loadEnvConfig(process.cwd());

function preparePrismaDatabaseUrl(connectionString: string | undefined) {
  if (!connectionString) {
    return undefined;
  }

  try {
    const url = new URL(normalizePostgresSslMode(connectionString));

    if (url.hostname.endsWith(".neon.tech")) {
      url.hostname = url.hostname.replace("-pooler.", ".");

      if (!url.searchParams.has("connect_timeout")) {
        url.searchParams.set("connect_timeout", "15");
      }
    }

    return url.toString();
  } catch {
    return normalizePostgresSslMode(connectionString);
  }
}

const PLACEHOLDER_DATABASE_URL =
  "postgresql://placeholder:placeholder@127.0.0.1:5432/placeholder?schema=public";

function isPrismaGenerateCommand() {
  return process.argv.some((arg) => arg === "generate" || arg.endsWith("prisma"));
}

function resolveDatabaseUrl() {
  const fromEnv = preparePrismaDatabaseUrl(
    process.env["DATABASE_DIRECT_URL"] ??
      process.env["DATABASE_URL_UNPOOLED"] ??
      process.env["DATABASE_POOL_URL"] ??
      process.env["DATABASE_URL"],
  );

  if (fromEnv) {
    return fromEnv;
  }

  // `prisma generate` never connects to the database; allow install/build
  // steps on hosts where runtime env vars are not injected yet.
  if (isPrismaGenerateCommand()) {
    return PLACEHOLDER_DATABASE_URL;
  }

  throw new Error(
    "DATABASE_DIRECT_URL, DATABASE_URL_UNPOOLED, DATABASE_POOL_URL, or DATABASE_URL is not set",
  );
}

const databaseUrl = resolveDatabaseUrl();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
