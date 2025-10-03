-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN "code" TEXT;

-- CreateIndex
CREATE INDEX "VerificationToken_code_idx" ON "VerificationToken"("code");
