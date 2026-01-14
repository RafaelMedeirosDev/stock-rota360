/*
  Warnings:

  - A unique constraint covering the columns `[name,measurementValue,measurementUnit]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_name_measurementValue_measurementUnit_key" ON "product"("name", "measurementValue", "measurementUnit");
