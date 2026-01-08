-- CreateEnum
CREATE TYPE "PRODUCT_CATEGORY" AS ENUM ('BEVERAGES', 'BEER', 'DRINK', 'SHOT', 'PORTION', 'SNACK', 'SANDWICHE', 'SKEWER', 'DESSERT', 'SOUP', 'ADDITIONAL_SAUCE');

-- CreateEnum
CREATE TYPE "PRODUCT_TYPE" AS ENUM ('RESELL', 'PREPARED');

-- CreateEnum
CREATE TYPE "MOVEMENT_TYPE" AS ENUM ('ENTRY', 'EXIT', 'ADJUST');

-- CreateEnum
CREATE TYPE "UNIT_TYPE" AS ENUM ('KG', 'G', 'L', 'ML', 'UNIT');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'USEREMPLOYEE');

-- CreateTable
CREATE TABLE "Product" (
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

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movement" (
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

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SUPPLY" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "unitType" "UNIT_TYPE" NOT NULL,
    "minStock" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SUPPLY_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RECIPT_ITEM" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "supplyId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RECIPT_ITEM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SUPPLY_MOVEMENT" (
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

    CONSTRAINT "SUPPLY_MOVEMENT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "credentialId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credential" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "ROLE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_email_key" ON "Credential"("email");
