/*
  Warnings:

  - You are about to drop the column `category` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "amount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "category",
ADD COLUMN     "categories" TEXT[] DEFAULT ARRAY[]::TEXT[];
