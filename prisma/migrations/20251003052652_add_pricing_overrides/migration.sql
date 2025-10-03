-- AlterTable
ALTER TABLE "PricingData" ADD COLUMN "overrideDOA" REAL;
ALTER TABLE "PricingData" ADD COLUMN "overrideGradeA" REAL;
ALTER TABLE "PricingData" ADD COLUMN "overrideGradeB" REAL;
ALTER TABLE "PricingData" ADD COLUMN "overrideGradeC" REAL;
ALTER TABLE "PricingData" ADD COLUMN "overrideGradeD" REAL;
ALTER TABLE "PricingData" ADD COLUMN "overrideSetAt" DATETIME;
ALTER TABLE "PricingData" ADD COLUMN "overrideSetBy" TEXT;
