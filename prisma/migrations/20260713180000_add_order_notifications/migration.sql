-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PREPARING', 'ASSIGNED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED');

-- AlterTable
ALTER TABLE "orders"
ADD COLUMN "fulfillmentStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "customerName" TEXT,
ADD COLUMN "customerPhone" TEXT,
ADD COLUMN "customerAddress" TEXT,
ADD COLUMN "riderId" TEXT,
ADD COLUMN "riderName" TEXT,
ADD COLUMN "riderPhone" TEXT,
ADD COLUMN "assignedAt" TIMESTAMP(3),
ADD COLUMN "pickedUpAt" TIMESTAMP(3),
ADD COLUMN "deliveredAt" TIMESTAMP(3),
ADD COLUMN "estimatedTime" INTEGER,
ADD COLUMN "adminNotes" TEXT,
ADD COLUMN "notificationSent" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "order_status_log" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_status_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "riders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "riders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "order_status_log_orderId_createdAt_idx" ON "order_status_log"("orderId", "createdAt");

-- CreateIndex
CREATE INDEX "orders_fulfillmentStatus_createdAt_idx" ON "orders"("fulfillmentStatus", "createdAt");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "riders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_status_log" ADD CONSTRAINT "order_status_log_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill confirmed fulfillment status for already-paid orders
UPDATE "orders"
SET "fulfillmentStatus" = 'CONFIRMED'
WHERE "status" IN ('paid', 'paid_fulfillment_review');
