-- CreateTable
CREATE TABLE "MarginTier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "minPrice" REAL NOT NULL,
    "maxPrice" REAL NOT NULL,
    "marginGradeA" REAL NOT NULL,
    "marginGradeB" REAL NOT NULL,
    "marginGradeC" REAL NOT NULL,
    "marginGradeD" REAL NOT NULL,
    "marginDOA" REAL NOT NULL,
    "usePercentage" BOOLEAN NOT NULL DEFAULT false,
    "percentGradeA" REAL,
    "percentGradeB" REAL,
    "percentGradeC" REAL,
    "percentGradeD" REAL,
    "percentDOA" REAL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "MarginTier_minPrice_maxPrice_idx" ON "MarginTier"("minPrice", "maxPrice");

-- CreateIndex
CREATE INDEX "MarginTier_priority_idx" ON "MarginTier"("priority");
