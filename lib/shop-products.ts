import "server-only";

import { Prisma } from "@/generated/db";
import type { Prisma as PrismaTypes } from "@/generated/db";
import { prisma } from "@/lib/prisma";

export const SHOP_PRODUCT_SELECT = {
  id: true,
  name: true,
  description: true,
  price: true,
  quantity: true,
  imageUrl: true,
  category: true,
  manufacturer: true,
  dosage: true,
  prescriptionRequired: true,
  isFeatured: true,
  featuredRank: true,
} satisfies PrismaTypes.ProductSelect;

export type ShopProductRow = PrismaTypes.ProductGetPayload<{
  select: typeof SHOP_PRODUCT_SELECT;
}>;

export const DEFAULT_SHOP_PAGE_SIZE = 48;
export const MAX_SHOP_PAGE_SIZE = 100;

/** Minimum trigram similarity (0–1). Lower = more typo tolerance. */
const FUZZY_SIMILARITY_THRESHOLD = 0.22;

export function normalizeShopSearchQuery(value?: string | null) {
  const trimmed = value?.trim().slice(0, 100);
  return trimmed || undefined;
}

export function tokenizeShopSearchQuery(value: string) {
  return value
    .toLowerCase()
    .split(/[\s,/+]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);
}

/** Prisma fallback when trigram search is unavailable. */
export function buildShopProductWhere(searchQuery?: string): PrismaTypes.ProductWhereInput {
  const where: PrismaTypes.ProductWhereInput = { activeListing: true };
  const q = normalizeShopSearchQuery(searchQuery);

  if (!q) {
    return where;
  }

  const tokens = tokenizeShopSearchQuery(q);
  const searchTokens = tokens.length > 0 ? tokens : [q.toLowerCase()];

  const tokenFilters = searchTokens.map((token) => {
    const contains = { contains: token, mode: "insensitive" as const };
    const orFilters: PrismaTypes.ProductWhereInput[] = [
      { name: contains },
      { sku: contains },
      { category: contains },
      { manufacturer: contains },
      { dosage: contains },
    ];

    if (token.length >= 3) {
      orFilters.push({ description: contains });
    }

    return { OR: orFilters } satisfies PrismaTypes.ProductWhereInput;
  });

  return {
    activeListing: true,
    AND: tokenFilters,
  };
}

type FuzzyProductRow = {
  id: string;
  name: string;
  description: string | null;
  price: PrismaTypes.Decimal;
  quantity: number;
  imageUrl: string | null;
  category: string | null;
  manufacturer: string | null;
  dosage: string | null;
  prescriptionRequired: boolean;
  isFeatured: boolean;
  featuredRank: number | null;
  relevance: number;
};

function buildFuzzyTokenMatch(query: string, tokens: string[]): Prisma.Sql {
  const tokenPatterns = tokens.map((token) => `%${token}%`);

  const tokenClauses = tokens.map((token, index) =>
    Prisma.sql`
      (
        p."name" ILIKE ${tokenPatterns[index]}
        OR COALESCE(p."sku", '') ILIKE ${tokenPatterns[index]}
        OR COALESCE(p."category", '') ILIKE ${tokenPatterns[index]}
        OR COALESCE(p."manufacturer", '') ILIKE ${tokenPatterns[index]}
        OR COALESCE(p."dosage", '') ILIKE ${tokenPatterns[index]}
        OR COALESCE(p."description", '') ILIKE ${tokenPatterns[index]}
        OR similarity(p."name", ${token}) > ${FUZZY_SIMILARITY_THRESHOLD}
        OR word_similarity(${token}, p."name") > ${FUZZY_SIMILARITY_THRESHOLD}
        OR similarity(COALESCE(p."category", ''), ${token}) > ${FUZZY_SIMILARITY_THRESHOLD}
        OR similarity(COALESCE(p."manufacturer", ''), ${token}) > ${FUZZY_SIMILARITY_THRESHOLD}
      )
    `,
  );

  return tokenClauses.length > 0
    ? Prisma.join(tokenClauses, " AND ")
    : Prisma.sql`TRUE`;
}

async function fuzzySearchShopProducts(
  searchQuery: string,
  limit: number,
  skip: number,
) {
  const tokens = tokenizeShopSearchQuery(searchQuery);
  const pattern = `%${searchQuery}%`;
  const query = searchQuery;
  const tokenMatch = buildFuzzyTokenMatch(query, tokens);

  // IMPORTANT: use prisma.$queryRaw(Prisma.sql`...`) — the function-call form,
  // NOT the tagged-template shorthand prisma.$queryRaw`...`.
  //
  // The tagged-template form treats every ${} as a query parameter, so a nested
  // Prisma.Sql object (like `tokenMatch`) gets JSON-serialised and sent as a
  // string value, causing PostgreSQL error 22P02.
  //
  // The function-call form receives a Prisma.Sql object built by Prisma.sql,
  // which correctly splices nested Prisma.Sql fragments as raw SQL.
  const dataQuery = Prisma.sql`
    SELECT
      p."id",
      p."name",
      p."description",
      p."price",
      p."quantity",
      p."imageUrl",
      p."category",
      p."manufacturer",
      p."dosage",
      p."prescriptionRequired",
      p."isFeatured",
      p."featuredRank",
      GREATEST(
        similarity(p."name", ${query}),
        word_similarity(${query}, p."name"),
        similarity(COALESCE(p."category", ''), ${query}),
        similarity(COALESCE(p."manufacturer", ''), ${query})
      ) AS relevance
    FROM "product" p
    WHERE p."activeListing" = true
      AND (
        p."name" ILIKE ${pattern}
        OR COALESCE(p."sku", '') ILIKE ${pattern}
        OR COALESCE(p."category", '') ILIKE ${pattern}
        OR COALESCE(p."manufacturer", '') ILIKE ${pattern}
        OR COALESCE(p."dosage", '') ILIKE ${pattern}
        OR COALESCE(p."description", '') ILIKE ${pattern}
        OR similarity(p."name", ${query}) > ${FUZZY_SIMILARITY_THRESHOLD}
        OR word_similarity(${query}, p."name") > ${FUZZY_SIMILARITY_THRESHOLD}
        OR similarity(COALESCE(p."category", ''), ${query}) > ${FUZZY_SIMILARITY_THRESHOLD}
        OR similarity(COALESCE(p."manufacturer", ''), ${query}) > ${FUZZY_SIMILARITY_THRESHOLD}
      )
      AND (${tokenMatch})
    ORDER BY
      relevance DESC,
      p."isFeatured" DESC,
      p."featuredRank" ASC NULLS LAST,
      p."createAt" DESC
    LIMIT ${limit}
    OFFSET ${skip}
  `;

  const countQuery = Prisma.sql`
    SELECT COUNT(*)::int AS count
    FROM "product" p
    WHERE p."activeListing" = true
      AND (
        p."name" ILIKE ${pattern}
        OR COALESCE(p."sku", '') ILIKE ${pattern}
        OR COALESCE(p."category", '') ILIKE ${pattern}
        OR COALESCE(p."manufacturer", '') ILIKE ${pattern}
        OR COALESCE(p."dosage", '') ILIKE ${pattern}
        OR COALESCE(p."description", '') ILIKE ${pattern}
        OR similarity(p."name", ${query}) > ${FUZZY_SIMILARITY_THRESHOLD}
        OR word_similarity(${query}, p."name") > ${FUZZY_SIMILARITY_THRESHOLD}
        OR similarity(COALESCE(p."category", ''), ${query}) > ${FUZZY_SIMILARITY_THRESHOLD}
        OR similarity(COALESCE(p."manufacturer", ''), ${query}) > ${FUZZY_SIMILARITY_THRESHOLD}
      )
      AND (${tokenMatch})
  `;

  const [rows, countRows] = await Promise.all([
    prisma.$queryRaw<FuzzyProductRow[]>(dataQuery),
    prisma.$queryRaw<Array<{ count: number }>>(countQuery),
  ]);

  const products: ShopProductRow[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    quantity: row.quantity,
    imageUrl: row.imageUrl,
    category: row.category,
    manufacturer: row.manufacturer,
    dosage: row.dosage,
    prescriptionRequired: row.prescriptionRequired,
    isFeatured: row.isFeatured,
    featuredRank: row.featuredRank,
  }));

  return {
    products,
    total: countRows[0]?.count ?? 0,
  };
}

async function prismaSearchShopProducts(
  searchQuery: string | undefined,
  limit: number,
  skip: number,
) {
  const where = buildShopProductWhere(searchQuery);

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: [
        { isFeatured: "desc" },
        { featuredRank: "asc" },
        { createAt: "desc" },
      ],
      take: limit,
      skip,
      select: SHOP_PRODUCT_SELECT,
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total };
}

export async function searchShopProducts(options: {
  q?: string;
  limit?: number;
  skip?: number;
}) {
  const limit = Math.min(
    options.limit ?? DEFAULT_SHOP_PAGE_SIZE,
    MAX_SHOP_PAGE_SIZE,
  );
  const skip = Math.max(0, options.skip ?? 0);
  const q = normalizeShopSearchQuery(options.q);

  if (!q) {
    return {
      ...(await prismaSearchShopProducts(undefined, limit, skip)),
      limit,
      skip,
    };
  }

  try {
    const fuzzy = await fuzzySearchShopProducts(q, limit, skip);
    return { ...fuzzy, limit, skip };
  } catch (error) {
    console.error("Fuzzy shop search failed, using fallback filter", error);
    const fallback = await prismaSearchShopProducts(q, limit, skip);
    return { ...fallback, limit, skip };
  }
}

export function toProductCardModel(product: ShopProductRow) {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    image: product.imageUrl,
    category: product.category,
    quantity: product.quantity,
    prescriptionRequired: product.prescriptionRequired,
  };
}
