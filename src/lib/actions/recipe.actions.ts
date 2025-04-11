"use server";
import { prisma } from "@/app/db/prisma";
import { convertToPlainObject } from "../utils";

// Get the latest products
export async function getRecipes() {
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
          nutritionalValue: true
        }
      }
    }
  });
  return convertToPlainObject(data);
}

export async function getRecipeBySlug(slug: string) {
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
          nutritionalValue: true
        }
      }
    }
  });
}
