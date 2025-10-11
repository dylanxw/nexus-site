-- CreateTable
CREATE TABLE "RepairModelIssue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "modelId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RepairModelIssue_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "RepairModel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RepairModelIssue_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "RepairIssue" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RepairModelIssue_modelId_issueId_key" ON "RepairModelIssue"("modelId", "issueId");

-- CreateIndex
CREATE INDEX "RepairModelIssue_modelId_idx" ON "RepairModelIssue"("modelId");

-- CreateIndex
CREATE INDEX "RepairModelIssue_issueId_idx" ON "RepairModelIssue"("issueId");
