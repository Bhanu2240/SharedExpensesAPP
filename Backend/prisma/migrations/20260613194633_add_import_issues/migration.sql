-- CreateTable
CREATE TABLE "ImportIssue" (
    "id" TEXT NOT NULL,
    "rowNumber" INTEGER NOT NULL,
    "issueType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImportIssue_pkey" PRIMARY KEY ("id")
);
