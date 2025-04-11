"use server";
import { prisma } from "@/app/db/prisma";
import { convertToPlainObject } from "../utils";
import { FullRecipe, RecipePreview } from "@/types";

export async function getRecipePreviews(): Promise<RecipePreview[]> {
  const data = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      images: true,
      handsOnTime: true,
    }
  });
  
  return convertToPlainObject(data);
}


export async function getRecipeBySlug(slug: string): Promise<FullRecipe | null> {
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

