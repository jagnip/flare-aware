import { CollectionDB, IngredientDB } from "@/types";
import { RecipeFormInput, recipeSchema } from "../validator";
import { parseIngredient } from "@jlucaspains/sharp-recipe-parser";
import slugify from "slugify";
import { Prisma } from "@prisma/client";

export function formatRecipeForDB(
  formInputValues: RecipeFormInput,
  collections: CollectionDB[]
): Prisma.RecipeCreateArgs["data"] {

  const formattedCollections = formInputValues.collections.map((name) => {
    const match = collections.find((c) => c.name === name);
    if (!match) {
      throw new Error(`Collection with name "${name}" not found`);
    }
    return { id: match.id };
  });

  const formattedInstructions = formatInstructionsForDB(formInputValues.instructions);

  const formattedIngredients = formInputValues.ingredients
    .split("\n")
    .map((ingredient) =>
      parseIngredient(ingredient, "en", {
        includeAlternativeUnits: true,
        includeExtra: true,
      })
    )
    .filter((i): i is IngredientDB => i !== null);

  const slug = slugify(formInputValues.name, { lower: true });

  return {
    ...formInputValues,
    slug,
    collections: { connect: formattedCollections },
    instructions: formattedInstructions,
    ingredients: formattedIngredients,
  };
}

function formatInstructionsForDB(instructions: string) : string[] {
  return instructions
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
