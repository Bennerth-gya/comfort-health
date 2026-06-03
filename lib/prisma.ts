import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { assertProductionEnv } from "@/lib/env";
import { PrismaClient } from "../generated/db";
import type { PrismaClient as PrismaClientType } from "../generated/db";

assertProductionEnv();

const connectionString = process.env.DATABASE_POOL_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_POOL_URL or DATABASE_URL is not set");
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
  prismaPool: Pool | undefined;
};

const pool =
  globalForPrisma.prismaPool ??
  new Pool({
    connectionString,
    max: Number(process.env.DB_POOL_MAX ?? 3),
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS ?? 10_000),
    connectionTimeoutMillis: Number(
      process.env.DB_CONNECTION_TIMEOUT_MS ??
        (process.env.NODE_ENV === "production" ? 30_000 : 60_000),
    ),
  });

pool.on("error", (error) => {
  console.error("Postgres idle client error", error);
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(pool, {
      onPoolError: (error) => {
        console.error("Postgres pool error", error);
      },
      onConnectionError: (error) => {
        console.error("Postgres connection error", error);
      },
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaPool = pool;
}
