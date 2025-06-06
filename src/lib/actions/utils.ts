import { CollectionDB } from "@/types";
import { RecipeFormInput, recipeSchema } from "../validator";
import slugify from "slugify";
import { Prisma } from "@prisma/client";

export function formatRecipeForDB(
  formInputValues: RecipeFormInput,
  collections: CollectionDB[]
): Prisma.RecipeCreateArgs["data"] {
  const formattedCollections = formInputValues.collections.map(
    (collectionId) => ({
      id: collectionId,
    })
  );

  const formattedInstructions = formatInstructionsForDB(
    formInputValues.instructions
  );

  const formattedIngredients = formatIngredientsForDB(
    formInputValues.ingredients
  );

  const slug = slugify(formInputValues.name, { lower: true });

  return {
    ...formInputValues,
    slug,
    collections: { connect: formattedCollections },
    instructions: formattedInstructions,
    ingredients: formattedIngredients,
  };
}

function formatInstructionsForDB(instructions: string): string[] {
  return instructions
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function formatIngredientsForDB(instructions: string): string[] {
  return instructions
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
