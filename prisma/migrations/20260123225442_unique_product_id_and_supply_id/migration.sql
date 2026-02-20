/*
  Warnings:

  - A unique constraint covering the columns `[productId,supplyId]` on the table `recip_item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recip_item_productId_supplyId_key" ON "recip_item"("productId", "supplyId");
