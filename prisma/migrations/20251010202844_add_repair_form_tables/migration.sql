-- CreateTable
CREATE TABLE "RepairDevice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RepairBrand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RepairBrand_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "RepairDevice" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RepairModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RepairModel_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "RepairBrand" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RepairIssue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RepairDeviceIssue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deviceId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    CONSTRAINT "RepairDeviceIssue_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "RepairDevice" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RepairDeviceIssue_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "RepairIssue" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RepairBooking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookingNumber" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "issues" TEXT NOT NULL,
    "description" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "appointmentDate" TEXT,
    "appointmentTime" TEXT,
    "requestType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "calendarEventId" TEXT,
    "notes" TEXT,
    "staffNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RepairDevice_slug_key" ON "RepairDevice"("slug");

-- CreateIndex
CREATE INDEX "RepairDevice_active_order_idx" ON "RepairDevice"("active", "order");

-- CreateIndex
CREATE INDEX "RepairBrand_deviceId_active_order_idx" ON "RepairBrand"("deviceId", "active", "order");

-- CreateIndex
CREATE UNIQUE INDEX "RepairBrand_deviceId_name_key" ON "RepairBrand"("deviceId", "name");

-- CreateIndex
CREATE INDEX "RepairModel_brandId_active_order_idx" ON "RepairModel"("brandId", "active", "order");

-- CreateIndex
CREATE UNIQUE INDEX "RepairModel_brandId_name_key" ON "RepairModel"("brandId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "RepairIssue_slug_key" ON "RepairIssue"("slug");

-- CreateIndex
CREATE INDEX "RepairIssue_active_order_idx" ON "RepairIssue"("active", "order");

-- CreateIndex
CREATE INDEX "RepairDeviceIssue_deviceId_idx" ON "RepairDeviceIssue"("deviceId");

-- CreateIndex
CREATE INDEX "RepairDeviceIssue_issueId_idx" ON "RepairDeviceIssue"("issueId");

-- CreateIndex
CREATE UNIQUE INDEX "RepairDeviceIssue_deviceId_issueId_key" ON "RepairDeviceIssue"("deviceId", "issueId");

-- CreateIndex
CREATE UNIQUE INDEX "RepairBooking_bookingNumber_key" ON "RepairBooking"("bookingNumber");

-- CreateIndex
CREATE INDEX "RepairBooking_status_createdAt_idx" ON "RepairBooking"("status", "createdAt");

-- CreateIndex
CREATE INDEX "RepairBooking_email_idx" ON "RepairBooking"("email");

-- CreateIndex
CREATE INDEX "RepairBooking_appointmentDate_idx" ON "RepairBooking"("appointmentDate");

-- CreateIndex
CREATE INDEX "RepairBooking_requestType_idx" ON "RepairBooking"("requestType");
