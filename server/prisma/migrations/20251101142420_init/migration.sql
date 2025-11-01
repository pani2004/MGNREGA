-- CreateTable
CREATE TABLE "states" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "districts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district_data" (
    "id" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "financialYear" TEXT NOT NULL,
    "month" TEXT,
    "totalJobCardsIssued" INTEGER NOT NULL DEFAULT 0,
    "totalWorkers" INTEGER NOT NULL DEFAULT 0,
    "activeJobCards" INTEGER NOT NULL DEFAULT 0,
    "activeWorkers" INTEGER NOT NULL DEFAULT 0,
    "totalHouseholdsWorked" INTEGER NOT NULL DEFAULT 0,
    "totalPersonDaysGenerated" BIGINT NOT NULL DEFAULT 0,
    "womenPersonDaysGenerated" BIGINT NOT NULL DEFAULT 0,
    "scPersonDaysGenerated" BIGINT NOT NULL DEFAULT 0,
    "stPersonDaysGenerated" BIGINT NOT NULL DEFAULT 0,
    "approvedLabourBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalExpenditure" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "wageExpenditure" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "materialExpenditure" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "adminExpenditure" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalWorksCompleted" INTEGER NOT NULL DEFAULT 0,
    "totalWorksOngoing" INTEGER NOT NULL DEFAULT 0,
    "averageWagePerDay" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ftosGenerated" INTEGER NOT NULL DEFAULT 0,
    "totalPaymentsMade" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dataSource" TEXT NOT NULL DEFAULT 'api',
    "lastSyncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "district_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sync_logs" (
    "id" TEXT NOT NULL,
    "syncType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "recordCount" INTEGER NOT NULL DEFAULT 0,
    "errorMsg" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "states_name_key" ON "states"("name");

-- CreateIndex
CREATE UNIQUE INDEX "states_code_key" ON "states"("code");

-- CreateIndex
CREATE UNIQUE INDEX "districts_stateId_name_key" ON "districts"("stateId", "name");

-- CreateIndex
CREATE INDEX "district_data_districtId_financialYear_idx" ON "district_data"("districtId", "financialYear");

-- CreateIndex
CREATE UNIQUE INDEX "district_data_districtId_financialYear_month_key" ON "district_data"("districtId", "financialYear", "month");

-- AddForeignKey
ALTER TABLE "districts" ADD CONSTRAINT "districts_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "district_data" ADD CONSTRAINT "district_data_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
