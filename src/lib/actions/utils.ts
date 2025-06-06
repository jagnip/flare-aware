import { CollectionDB, IngredientDB } from "@/types";
import { RecipeFormInput, recipeSchema } from "../validator";
import { parseIngredient } from "@jlucaspains/sharp-recipe-parser";
import slugify from "slugify";
import { Prisma } from "@prisma/client";

export function normalizeRecipeFormInput(
  input: RecipeFormInput,
  collections: CollectionDB[]
): Prisma.RecipeCreateArgs["data"] {
  const parsed = recipeSchema.parse(input);
  const parsedCollections = parsed.collections.map((name) => {
    const match = collections.find((c) => c.name === name);
    if (!match) {
      throw new Error(`Collection with name "${name}" not found`);
    }
    return { id: match.id };
  });

  const parsedInstructions = parsed.instructions
    ? parsed.instructions
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
    : [];

  const parsedIngredients = parsed.ingredients
    .split("\n")
    .map((ingredient) =>
      parseIngredient(ingredient, "en", {
        includeAlternativeUnits: true,
        includeExtra: true,
      })
    )
    .filter((i): i is IngredientDB => i !== null);

  const slug = slugify(parsed.name, { lower: true });

  console.log("Let us inspect parsed: ", parsed);

  return {
    ...parsed,
    slug,
    collections: { connect: parsedCollections },
    instructions: parsedInstructions,
    ingredients: parsedIngredients,
  };
}
