"use server";

import { prisma } from "@/app/db/prisma";
import { RecipeDB } from "@/types";
import { Prisma } from "@prisma/client";

export async function getRecipes(): Promise<RecipeDB[]> {
  const recipes = await prisma.recipe.findMany({
    include: {
      collections: true,
    },
  });
  return recipes;
}

export async function getRecipeBySlug(slug: string): Promise<RecipeDB | null> {
  return await prisma.recipe.findFirst({
    where: { slug: slug },
    include: {
      collections: true,
    },
  });
}

export async function deleteRecipe(id: string) {
  try {
    const recipe = await prisma.recipe.findFirst({
      where: { id },
    });

    if (!recipe) throw new Error("Recipe not found");

    const slug = recipe.slug;
    await prisma.recipe.delete({ where: { id } });

    return {
      success: true,
      message: "Recipe deleted successfully",
    };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function createRecipe(
  recipeData: Prisma.RecipeCreateArgs["data"]
) {
  try {
    const newRecipe = await prisma.recipe.create({ data: recipeData });
  } catch (err) {
    if (err instanceof Error && "errors" in err) {
      console.error("❌ Zod validation failed:", (err as any).errors);
    } else {
      console.error("❌ An unexpected error occurred:", err);
    }
  }
}
