/*
  Warnings:

  - A unique constraint covering the columns `[variantId]` on the table `NutritionalValue` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "NutritionalValue" DROP CONSTRAINT "NutritionalValue_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_recipeId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "variantId" UUID,
ALTER COLUMN "recipeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "NutritionalValue" ADD COLUMN     "variantId" UUID,
ALTER COLUMN "recipeId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "RecipeVariant" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "recipeId" UUID NOT NULL,

    CONSTRAINT "RecipeVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NutritionalValue_variantId_key" ON "NutritionalValue"("variantId");

-- AddForeignKey
ALTER TABLE "RecipeVariant" ADD CONSTRAINT "RecipeVariant_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "RecipeVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionalValue" ADD CONSTRAINT "NutritionalValue_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionalValue" ADD CONSTRAINT "NutritionalValue_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "RecipeVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Ingredient"
ADD CONSTRAINT ingredient_must_have_one_parent
CHECK (
  ("recipeId" IS NULL) != ("variantId" IS NULL)
);

ALTER TABLE "NutritionalValue"
ADD CONSTRAINT nutritional_value_must_have_one_parent
CHECK (
  ("recipeId" IS NULL) != ("variantId" IS NULL)
);