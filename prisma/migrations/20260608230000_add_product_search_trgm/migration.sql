-- Trigram indexes for fuzzy shop search (typo-tolerant name/category/brand lookup).
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS "product_name_trgm_idx"
  ON "product" USING gin ("name" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS "product_category_trgm_idx"
  ON "product" USING gin ("category" gin_trgm_ops)
  WHERE "category" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "product_manufacturer_trgm_idx"
  ON "product" USING gin ("manufacturer" gin_trgm_ops)
  WHERE "manufacturer" IS NOT NULL;
