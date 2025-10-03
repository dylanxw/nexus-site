-- AlterTable
ALTER TABLE "PricingData" ADD COLUMN "series" TEXT;

-- CreateIndex
CREATE INDEX "PricingData_series_idx" ON "PricingData"("series");
