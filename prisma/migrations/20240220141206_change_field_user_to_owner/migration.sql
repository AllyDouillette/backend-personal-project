/*
  Warnings:

  - You are about to drop the column `userUUID` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `userUUID` on the `Category` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_userUUID_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userUUID_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "userUUID",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "userUUID",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
