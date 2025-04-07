/*
  Warnings:

  - You are about to drop the column `sourceId` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "sourceId";

-- CreateTable
CREATE TABLE "Source" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "recipeId" UUID NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Source_recipeId_key" ON "Source"("recipeId");

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
