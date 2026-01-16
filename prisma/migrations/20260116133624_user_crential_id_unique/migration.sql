/*
  Warnings:

  - A unique constraint covering the columns `[credentialId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_credentialId_key" ON "user"("credentialId");
