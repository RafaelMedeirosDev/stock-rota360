-- CreateEnum
CREATE TYPE "PRODUCT_CATEGORY" AS ENUM ('BEVERAGE', 'BEER', 'DRINK', 'SHOT', 'PORTION', 'SNACK', 'SANDWICH', 'SKEWER', 'DESSERT', 'SOUP', 'ADDITIONAL_SAUCE');

-- CreateEnum
CREATE TYPE "PRODUCT_TYPE" AS ENUM ('RESELL', 'PREPARED');

-- CreateEnum
CREATE TYPE "MOVEMENT_TYPE" AS ENUM ('ENTRY', 'EXIT', 'ADJUST');

-- CreateEnum
CREATE TYPE "UNIT_TYPE" AS ENUM ('KG', 'G', 'L', 'ML', 'UNIT');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'EMPLOYEE');

-- CreateTable
CREATE TABLE "product" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "variant" TEXT,
    "measurementValue" INTEGER,
    "measurementUnit" "UNIT_TYPE",
    "type" "PRODUCT_TYPE" NOT NULL,
    "category" "PRODUCT_CATEGORY" NOT NULL,
    "minStock" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movement" (
    "id" UUID NOT NULL,
    "type" "MOVEMENT_TYPE" NOT NULL,
    "productId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "uniCost" DECIMAL(10,2),
    "unitSalePrice" DECIMAL(10,2),
    "userId" UUID NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supply" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "unitType" "UNIT_TYPE" NOT NULL,
    "minStock" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "supply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recip_item" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "supplyId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "recip_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supply_movement" (
    "id" UUID NOT NULL,
    "type" "MOVEMENT_TYPE" NOT NULL,
    "supplyId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "uniCost" DECIMAL(10,2),
    "userId" UUID NOT NULL,
    "description" TEXT,
    "originMovementId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "supply_movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "credentialId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credential" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "ROLE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "credential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "credential_email_key" ON "credential"("email");

-- AddForeignKey
ALTER TABLE "movement" ADD CONSTRAINT "movement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supply_movement" ADD CONSTRAINT "supply_movement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
