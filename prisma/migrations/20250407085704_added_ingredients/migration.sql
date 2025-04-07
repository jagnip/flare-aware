-- CreateTable
CREATE TABLE "Ingredient" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "recipeId" UUID NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
