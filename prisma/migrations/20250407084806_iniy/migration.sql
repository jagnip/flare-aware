-- CreateTable
CREATE TABLE "Recipe" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Uncategorised',
    "images" TEXT[],
    "servings" INTEGER,
    "handsOnTime" INTEGER,
    "handsOffTime" INTEGER,
    "instructions" TEXT[],
    "sourceId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipe_slug_idx" ON "Recipe"("slug");
