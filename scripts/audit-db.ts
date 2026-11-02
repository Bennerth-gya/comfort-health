import 'dotenv/config'
import { PrismaClient } from '../generated/db/index.js'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Auditing DB for base64 / data: image URLs...");

  // Products
  const totalProducts = await prisma.product.count();
  const products = await prisma.product.findMany({
    select: { id: true, name: true, imageUrl: true },
  });
  
  let productBase64Count = 0;
  let productBase64Bytes = 0;
  let productCdnCount = 0;
  let productNullCount = 0;
  const sampleBase64Products: Array<{ id: string; name: string; prefix: string; length: number }> = [];

  for (const p of products) {
    if (!p.imageUrl) {
      productNullCount++;
    } else if (p.imageUrl.startsWith("data:")) {
      productBase64Count++;
      const len = p.imageUrl.length;
      productBase64Bytes += len;
      if (sampleBase64Products.length < 5) {
        sampleBase64Products.push({
          id: p.id,
          name: p.name,
          prefix: p.imageUrl.slice(0, 50),
          length: len,
        });
      }
    } else {
      productCdnCount++;
    }
  }

  // HeroSlides
  const totalSlides = await prisma.heroSlide.count();
  const slides = await prisma.heroSlide.findMany({
    select: { id: true, title: true, imageUrl: true },
  });
  let slideBase64Count = 0;
  let slideBase64Bytes = 0;
  for (const s of slides) {
    if (s.imageUrl?.startsWith("data:")) {
      slideBase64Count++;
      slideBase64Bytes += s.imageUrl.length;
    }
  }

  // HealthArticle
  const totalArticles = await prisma.healthArticle.count();
  const articles = await prisma.healthArticle.findMany({
    select: { id: true, title: true, coverImage: true },
  });
  let articleBase64Count = 0;
  let articleBase64Bytes = 0;
  for (const a of articles) {
    if (a.coverImage?.startsWith("data:")) {
      articleBase64Count++;
      articleBase64Bytes += a.coverImage.length;
    }
  }

  // Bundle
  const totalBundles = await prisma.bundle.count();
  const bundles = await prisma.bundle.findMany({
    select: { id: true, name: true, imageUrl: true },
  });
  let bundleBase64Count = 0;
  let bundleBase64Bytes = 0;
  for (const b of bundles) {
    if (b.imageUrl?.startsWith("data:")) {
      bundleBase64Count++;
      bundleBase64Bytes += b.imageUrl.length;
    }
  }

  console.log("---AUDIT-START---");
  console.log(JSON.stringify({
    products: {
      total: totalProducts,
      base64Count: productBase64Count,
      base64BytesTotal: productBase64Bytes,
      avgBase64Bytes: productBase64Count > 0 ? Math.round(productBase64Bytes / productBase64Count) : 0,
      cdnCount: productCdnCount,
      nullCount: productNullCount,
      sampleBase64Products,
    },
    heroSlides: {
      total: totalSlides,
      base64Count: slideBase64Count,
      base64BytesTotal: slideBase64Bytes,
    },
    healthArticles: {
      total: totalArticles,
      base64Count: articleBase64Count,
      base64BytesTotal: articleBase64Bytes,
    },
    bundles: {
      total: totalBundles,
      base64Count: bundleBase64Count,
      base64BytesTotal: bundleBase64Bytes,
    },
  }, null, 2));
  console.log("---AUDIT-END---");

  await pool.end();
  process.exit(0);
}

main().catch(async (err) => {
  console.error("Audit error:", err);
  await pool.end();
  process.exit(1);
});
