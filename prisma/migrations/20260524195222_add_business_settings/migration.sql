-- CreateTable
CREATE TABLE "BusinessSettings" (
    "id" TEXT NOT NULL,
    "deliveryFee" DECIMAL(10,2) NOT NULL DEFAULT 10,
    "lateFee" DECIMAL(10,2) NOT NULL DEFAULT 10,
    "cateringDepositPercent" INTEGER NOT NULL DEFAULT 50,
    "orderCutoffDay" INTEGER NOT NULL DEFAULT 4,
    "orderCutoffHour" INTEGER NOT NULL DEFAULT 17,
    "orderCutoffMinute" INTEGER NOT NULL DEFAULT 0,
    "noWeekendOrdering" BOOLEAN NOT NULL DEFAULT true,
    "deliveryArea" TEXT DEFAULT 'Greater Atlanta area',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessSettings_pkey" PRIMARY KEY ("id")
);
