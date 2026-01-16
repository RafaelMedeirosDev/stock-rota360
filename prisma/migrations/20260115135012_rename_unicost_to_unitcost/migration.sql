/*
  Warnings:

  - You are about to drop the column `uniCost` on the `movement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "movement" DROP COLUMN "uniCost",
ADD COLUMN     "unitCost" DECIMAL(10,2);
