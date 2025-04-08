"use server";
import { prisma } from "@/app/db/prisma";
import { convertToPlainObject } from "../utils";

// Get the latest products
export async function getRecipes() {
  const data = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(data);
}

export async function getRecipeBySlug(slug: string) {
  return await prisma.recipe.findFirst({
    where: { slug: slug },
  });
}
