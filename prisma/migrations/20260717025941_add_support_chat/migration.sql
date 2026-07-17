-- CreateEnum
CREATE TYPE "ConversationStatus" AS ENUM ('WAITING', 'ACTIVE', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "SenderType" AS ENUM ('STUDENT', 'PHARMACIST', 'SYSTEM');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'PRODUCT_RECOMMENDATION', 'SYSTEM_NOTICE');

-- DropIndex
DROP INDEX "product_name_trgm_idx";

-- CreateTable
CREATE TABLE "support_conversation" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "guestName" TEXT,
    "guestPhone" TEXT,
    "status" "ConversationStatus" NOT NULL DEFAULT 'WAITING',
    "subject" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastMessageAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pharmacistId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "support_conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support_message" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "senderType" "SenderType" NOT NULL,
    "senderName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "messageType" "MessageType" NOT NULL DEFAULT 'TEXT',
    "productId" TEXT,
    "productName" TEXT,
    "productPrice" DOUBLE PRECISION,
    "productImage" TEXT,

    CONSTRAINT "support_message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "support_conversation_status_lastMessageAt_idx" ON "support_conversation"("status", "lastMessageAt");

-- CreateIndex
CREATE INDEX "support_conversation_lastMessageAt_idx" ON "support_conversation"("lastMessageAt");

-- CreateIndex
CREATE INDEX "support_message_conversationId_createdAt_idx" ON "support_message"("conversationId", "createdAt");

-- AddForeignKey
ALTER TABLE "support_message" ADD CONSTRAINT "support_message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "support_conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
