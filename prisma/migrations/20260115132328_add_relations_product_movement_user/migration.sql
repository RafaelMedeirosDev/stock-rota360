-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
