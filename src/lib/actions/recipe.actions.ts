"use server";
import { prisma } from "@/app/db/prisma";
import { convertToPlainObject } from "../utils";
import { Recipe } from "@/types";
import { revalidatePath } from "next/cache";
import { recipeFormType, recipeSchema } from "../validator";
import { z } from "zod";
import { ROUTES } from "../constants";
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

async function createRecipe(input: recipeFormType) {
  try {
    const parsed = recipeSchema.parse(input);
    const normalized = normalizeRecipeFormData(parsed);
    const slug = slugify(parsed.name, { lower: true });
    const { collections, ...rest } = normalized;

    const recipe = await prisma.recipe.create({
      data: {
        ...rest,
        slug,
        collections: {
          connect: collections.map((id) => ({ id })),
        },
      },
    });

    console.log("✅ Collection added:", recipe);
  } catch (err) {
    if (err instanceof Error && "errors" in err) {
      console.error("❌ Zod validation failed:", (err as any).errors);
    } else {
      console.error("❌ An unexpected error occurred:", err);
    }
  }
}
