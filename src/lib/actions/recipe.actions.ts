"use server";
import { prisma } from "@/app/db/prisma";
import { convertToPlainObject } from "../utils";
import { Recipe } from "@/types";

export async function getRecipes(): Promise<Recipe[]> {
  const data = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
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
  return convertToPlainObject(data);
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
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
