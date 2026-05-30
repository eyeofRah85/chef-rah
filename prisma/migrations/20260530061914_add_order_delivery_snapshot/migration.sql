-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryAddressLine1" TEXT,
ADD COLUMN     "deliveryAddressLine2" TEXT,
ADD COLUMN     "deliveryCity" TEXT,
ADD COLUMN     "deliveryName" TEXT,
ADD COLUMN     "deliveryNotes" TEXT,
ADD COLUMN     "deliveryPhone" TEXT,
ADD COLUMN     "deliveryPostalCode" TEXT,
ADD COLUMN     "deliveryState" TEXT;
