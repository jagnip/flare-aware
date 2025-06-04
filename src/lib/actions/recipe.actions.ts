"use server";
import { prisma } from "@/app/db/prisma";
import { Recipe } from "@/types";
import { RecipeFormInput, recipeSchema } from "../validator";
import slugify from "slugify";
import { normalizeRecipeFormData } from "./utils";

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

    return {
      success: true,
      message: "Recipe deleted successfully",
    };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function createRecipe(input: RecipeFormInput) {
  try {
    // const normalized = normalizeRecipeFormData(parsed);
    // const slug = slugify(parsed.name, { lower: true });
    // const { collections, ...rest } = normalized;
  } catch (err) {
    if (err instanceof Error && "errors" in err) {
      console.error("❌ Zod validation failed:", (err as any).errors);
    } else {
      console.error("❌ An unexpected error occurred:", err);
    }
  }
}
