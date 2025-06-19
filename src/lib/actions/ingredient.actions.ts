import { PrismaClient } from "@prisma/client";
import pluralize from "pluralize";
import { convertToPlainObject } from "../utils";

const prisma = new PrismaClient();

export async function findIngredientByName(rawName: string) {
  const cleaned = rawName.trim().toLowerCase();
  const singular = pluralize.singular(cleaned);
  const plural = pluralize.plural(cleaned);

  const candidates = [cleaned, singular, plural];

  const ingredient = await prisma.ingredient.findFirst({
    where: {
      name: {
        in: candidates,
      },
    },
  });

  return ingredient;
}

export async function getIngredients() {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: { name: "asc" },
  });

  return convertToPlainObject(ingredients);
}