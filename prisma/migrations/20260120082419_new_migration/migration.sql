-- DropIndex
DROP INDEX "Job_organizationId_idx";

-- CreateIndex
CREATE INDEX "Job_organizationId_status_idx" ON "Job"("organizationId", "status");
