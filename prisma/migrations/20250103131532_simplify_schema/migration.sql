/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Update` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UpdatePoint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_belongsToId_fkey";

-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_productId_fkey";

-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_userId_fkey";

-- DropForeignKey
ALTER TABLE "UpdatePoint" DROP CONSTRAINT "UpdatePoint_updateId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "updatedAt",
ALTER COLUMN "title" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Update";

-- DropTable
DROP TABLE "UpdatePoint";

-- DropEnum
DROP TYPE "UPDATE_STATUS";
