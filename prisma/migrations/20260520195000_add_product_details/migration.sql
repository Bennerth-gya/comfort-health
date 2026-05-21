-- Add product details captured by the add-product form.
ALTER TABLE "product"
ADD COLUMN "description" TEXT,
ADD COLUMN "category" TEXT,
ADD COLUMN "dosage" TEXT,
ADD COLUMN "manufacturer" TEXT,
ADD COLUMN "expiryDate" TIMESTAMP(3),
ADD COLUMN "imageUrl" TEXT,
ADD COLUMN "prescriptionRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "activeListing" BOOLEAN NOT NULL DEFAULT true;
