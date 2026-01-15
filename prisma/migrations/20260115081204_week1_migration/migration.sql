-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('OPEN', 'COMPLETED');

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "posterId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "suggestedPrice" DOUBLE PRECISION,
    "status" "JobStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
