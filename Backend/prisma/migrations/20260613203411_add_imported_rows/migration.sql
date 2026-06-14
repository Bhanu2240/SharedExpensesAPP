-- CreateTable
CREATE TABLE "ImportedRow" (
    "id" TEXT NOT NULL,
    "rowNumber" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "paidBy" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT,
    "splitType" TEXT,
    "splitWith" TEXT,
    "splitDetails" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImportedRow_pkey" PRIMARY KEY ("id")
);
