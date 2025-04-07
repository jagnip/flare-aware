-- CreateTable
CREATE TABLE "NutritionalValue" (
    "id" UUID NOT NULL,
    "kcal" INTEGER NOT NULL,
    "carbs" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "recipeId" UUID NOT NULL,

    CONSTRAINT "NutritionalValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NutritionalValue_recipeId_key" ON "NutritionalValue"("recipeId");

-- AddForeignKey
ALTER TABLE "NutritionalValue" ADD CONSTRAINT "NutritionalValue_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
