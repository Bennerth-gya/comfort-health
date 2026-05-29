-- Add durable order/payment storage and indexes needed by checkout and inventory.
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'GHS',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "order_item" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "lineTotal" DECIMAL(12,2) NOT NULL,
    "imageUrl" TEXT,
    "category" TEXT,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "payment_transaction" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'paystack',
    "providerReference" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'GHS',
    "paidAt" TIMESTAMP(3),
    "rawPayload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_transaction_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "orders_reference_key" ON "orders"("reference");
CREATE INDEX "orders_email_createdAt_idx" ON "orders"("email", "createdAt");
CREATE INDEX "orders_status_createdAt_idx" ON "orders"("status", "createdAt");

CREATE INDEX "order_item_orderId_idx" ON "order_item"("orderId");
CREATE INDEX "order_item_productId_idx" ON "order_item"("productId");

CREATE UNIQUE INDEX "payment_transaction_orderId_key" ON "payment_transaction"("orderId");
CREATE UNIQUE INDEX "payment_transaction_reference_key" ON "payment_transaction"("reference");
CREATE INDEX "payment_transaction_status_createdAt_idx" ON "payment_transaction"("status", "createdAt");

CREATE INDEX "product_userId_createAt_idx" ON "product"("userId", "createAt");
CREATE INDEX "product_activeListing_createAt_idx" ON "product"("activeListing", "createAt");
CREATE INDEX "product_userId_activeListing_createAt_idx" ON "product"("userId", "activeListing", "createAt");
CREATE INDEX "product_userId_category_idx" ON "product"("userId", "category");
CREATE INDEX "product_userId_manufacturer_idx" ON "product"("userId", "manufacturer");
CREATE INDEX "product_userId_price_idx" ON "product"("userId", "price");

ALTER TABLE "order_item"
ADD CONSTRAINT "order_item_orderId_fkey"
FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "order_item"
ADD CONSTRAINT "order_item_productId_fkey"
FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "payment_transaction"
ADD CONSTRAINT "payment_transaction_orderId_fkey"
FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
