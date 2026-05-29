-- AlterTable
ALTER TABLE "MenuItemOptionChoice" ADD COLUMN     "description" TEXT,
ADD COLUMN     "dietaryInfo" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "requestOnly" BOOLEAN NOT NULL DEFAULT false;
