-- Harden checkout idempotency, tenant-scoped order reads, and product search.
ALTER TABLE "orders"
ADD COLUMN "idempotencyKey" TEXT,
ADD COLUMN "sellerId" TEXT;

ALTER TABLE "payment_transaction"
ADD COLUMN "authorizationUrl" TEXT,
ADD COLUMN "accessCode" TEXT;

CREATE UNIQUE INDEX "orders_idempotencyKey_key" ON "orders"("idempotencyKey");
CREATE INDEX "orders_sellerId_createdAt_idx" ON "orders"("sellerId", "createdAt");
CREATE INDEX "orders_sellerId_status_createdAt_idx" ON "orders"("sellerId", "status", "createdAt");

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX "product_name_trgm_idx" ON "product" USING gin ("name" gin_trgm_ops);
CREATE INDEX "product_description_trgm_idx" ON "product" USING gin ("description" gin_trgm_ops);
CREATE INDEX "product_sku_trgm_idx" ON "product" USING gin ("sku" gin_trgm_ops);
CREATE INDEX "product_manufacturer_trgm_idx" ON "product" USING gin ("manufacturer" gin_trgm_ops);
CREATE INDEX "product_userId_lowStock_candidates_idx"
ON "product"("userId", "quantity")
WHERE "lowStock" IS NOT NULL AND "quantity" > 0;
