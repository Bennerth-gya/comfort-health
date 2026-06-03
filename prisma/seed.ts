import { loadEnvConfig } from "@next/env";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/db";
import type { PrismaClient as PrismaClientType } from "../generated/db";

loadEnvConfig(process.cwd());

const connectionString =
  process.env.DATABASE_DIRECT_URL ??
  process.env.DATABASE_URL_UNPOOLED ??
  process.env.DATABASE_URL ??
  process.env.DATABASE_POOL_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_DIRECT_URL, DATABASE_URL_UNPOOLED, DATABASE_URL, or DATABASE_POOL_URL is not set",
  );
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClientType;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
async function main() {
  // Must match your Stack admin user ID (ADMIN_USER_IDS in .env.local), or inventory stays empty.
  const demoUserId =
    process.env.ADMIN_USER_IDS?.split(",")[0]?.trim() ||
    "2eba823f-23db-40c0-84ef-9d34bdb09cb0";

  await prisma.product.createMany({
    data: Array.from({ length: 25 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      price: parseFloat((Math.random() * 90 + 10).toFixed(2)),
      quantity: Math.floor(Math.random() * 20),
      lowStock: 5,
      createAt: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * (i * 5)
      ),
    })),
  });

  console.log("Seed data created successfully");
  console.log(`Created 25 products for user ID: ${demoUserId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
