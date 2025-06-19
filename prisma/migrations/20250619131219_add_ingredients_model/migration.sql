-- CreateEnum
CREATE TYPE "IngredientCategory" AS ENUM ('FRUITS', 'VEGETABLES', 'GRAIN', 'DAIRY_PRODUCTS', 'MEAT_PRODUCTS', 'FISH_AND_SEAFOOD', 'PASTA', 'LEGUMES', 'BAKERY_PRODUCTS', 'BAKING_AND_SWEETS', 'BEVERAGES_AND_LIQUIDS', 'CONDIMENTS_AND_SAUCES', 'HERBS_AND_SPICES', 'SEEDS_AND_NUTS', 'PRESERVED_AND_PICKLED');

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "IngredientCategory" NOT NULL,
    "iconFile" TEXT NOT NULL,
    "nutrition" JSONB,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_slug_key" ON "Ingredient"("slug");
