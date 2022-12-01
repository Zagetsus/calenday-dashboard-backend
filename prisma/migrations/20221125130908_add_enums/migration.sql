/*
  Warnings:

  - A unique constraint covering the columns `[reference]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "ProductTypeEnum" ADD VALUE 'KIT';

-- CreateIndex
CREATE UNIQUE INDEX "products_reference_key" ON "products"("reference");
