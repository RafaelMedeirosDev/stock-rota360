/*
  Warnings:

  - You are about to drop the column `uniCost` on the `supply_movement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "supply_movement" DROP COLUMN "uniCost",
ADD COLUMN     "unitCost" DECIMAL(10,2);

-- AddForeignKey
ALTER TABLE "supply_movement" ADD CONSTRAINT "supply_movement_supplyId_fkey" FOREIGN KEY ("supplyId") REFERENCES "supply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supply_movement" ADD CONSTRAINT "supply_movement_originMovementId_fkey" FOREIGN KEY ("originMovementId") REFERENCES "movement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
