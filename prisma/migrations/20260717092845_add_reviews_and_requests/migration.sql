-- CreateEnum
CREATE TYPE "ProductRequestStatus" AS ENUM ('PENDING', 'NOTED', 'ADDED', 'UNAVAILABLE');

-- CreateTable
CREATE TABLE "CustomerReview" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "reason" TEXT,
    "status" "ProductRequestStatus" NOT NULL DEFAULT 'PENDING',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductRequest_pkey" PRIMARY KEY ("id")
);
