"use server";
import { prisma } from "@/app/db/prisma";
import { convertToPlainObject } from "../utils";
import { Recipe } from "@/types";
import { revalidatePath } from "next/cache";
import { recipeForm } from "../validator";
import { z } from "zod";
import { ROUTES } from "../constants";

export async function getRecipes(): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    include: {
      collections: true,
    },
  });
  return recipes;
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
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

    revalidatePath(ROUTES.HOME);
    revalidatePath(ROUTES.COLLECTIONS);
    revalidateRecipeCollections(slug);
    return {
      success: true,
      message: "Recipe deleted successfully",
    };
  } catch (error) {
    return { success: false, message: error };
  }
}

async function revalidateRecipeCollections(slug: string) {
  const recipe = await prisma.recipe.findFirst({
    where: { slug },
    include: { collections: true },
  });

  if (!recipe) return;

  recipe.collections.forEach(({ slug }) => {
    revalidatePath(ROUTES.COLLECTION_DETAIL(slug));
  });

  revalidatePath(ROUTES.HOME);
  revalidatePath(ROUTES.COLLECTIONS);
}
