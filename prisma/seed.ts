import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/db";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const products = [
  {
    userId: "seed-user",
    name: "Wireless Mouse",
    sku: "MOUSE-001",
    price: 29.99,
    quantity: 24,
    lowStock: 5,
  },
  {
    userId: "seed-user",
    name: "Mechanical Keyboard",
    sku: "KEYBOARD-001",
    price: 89.99,
    quantity: 12,
    lowStock: 3,
  },
  {
    userId: "seed-user",
    name: "USB-C Hub",
    sku: "HUB-001",
    price: 49.99,
    quantity: 18,
    lowStock: 4,
  },
];

async function main() {
  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { sku: product.sku },
      select: { id: true },
    });

    if (existingProduct) {
      await prisma.product.update({
        where: { id: existingProduct.id },
        data: product,
      });
    } else {
      await prisma.product.create({
        data: product,
      });
    }
  }

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
