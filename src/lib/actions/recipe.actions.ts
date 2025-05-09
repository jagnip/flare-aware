"use server";
import { prisma } from "@/app/db/prisma";
import { convertToPlainObject } from "../utils";
import { FullRecipe, RecipePreview } from "@/types";
import { revalidatePath } from "next/cache";

export async function getRecipePreviews(): Promise<RecipePreview[]> {
  const data = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      images: true,
      handsOnTime: true,
    },
  });

  return convertToPlainObject(data);
}

export async function getRecipeBySlug(
  slug: string
): Promise<FullRecipe | null> {
  return await prisma.recipe.findFirst({
    where: { slug: slug },
    include: {
      collections: true,
      ingredients: true,
      nutritionalValue: true,
      source: true,
      variants: {
        include: {
          ingredients: true,
          nutritionalValue: true,
        },
      },
    },
  });
}

export async function deleteRecipe(id: string) {
  try {
    const recipe = await prisma.recipe.findFirst({
      where: { id },
    });

    if (!recipe) throw new Error("Recipe not found");

    const collections = await prisma.collection.findMany({
      where: {
        recipes: {
          some: {
            id: id,
          },
        },
      },
      select: {
        slug: true,
      },
    });

    await prisma.recipe.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath(`/recipe/${recipe.slug}`);
    collections.forEach(({ slug }) => revalidatePath(`/collection/${slug}`));

    return {
      success: true,
      message: "Recipe deleted successfully",
    };
  } catch (error) {
    return { success: false, message: error };
  }
}
