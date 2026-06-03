import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";

loadEnvConfig(process.cwd());

function preparePrismaDatabaseUrl(connectionString: string | undefined) {
  if (!connectionString) {
    return undefined;
  }

  try {
    const url = new URL(connectionString);

    if (url.hostname.endsWith(".neon.tech")) {
      url.hostname = url.hostname.replace("-pooler.", ".");

      if (!url.searchParams.has("connect_timeout")) {
        url.searchParams.set("connect_timeout", "15");
      }
    }

    return url.toString();
  } catch {
    return connectionString;
  }
}

const databaseUrl = preparePrismaDatabaseUrl(
  process.env["DATABASE_DIRECT_URL"] ??
    process.env["DATABASE_URL_UNPOOLED"] ??
    process.env["DATABASE_URL"] ??
    process.env["DATABASE_POOL_URL"],
);

if (!databaseUrl) {
  throw new Error(
    "DATABASE_DIRECT_URL, DATABASE_URL_UNPOOLED, DATABASE_URL, or DATABASE_POOL_URL is not set",
  );
}

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
