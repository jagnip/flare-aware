import { CollectionDB } from "@/types";
import {
  CollectionFormInput,
  RecipeFormInput,
  recipeSchema,
} from "../validator";
import slugify from "slugify";
import { Prisma } from "@prisma/client";
import { INGREDIENT_UNITS, QUALITATIVE_INGREDIENT_AMOUNTS } from "../constants";
import { INGREDIENTS_MAP } from "@/app/db/ingredients";
import pluralize from "pluralize";
import { parseIngredients } from "@/lib/ingredients/parsing";
export function parseRecipeForDB(
  formInputValues: RecipeFormInput,
  collections: CollectionDB[]
): Prisma.RecipeCreateArgs["data"] {
  const formattedCollections = formInputValues.collections.map(
    (collectionId) => ({
      id: collectionId,
    })
  );

  const formattedInstructions = parseInstructionsForDB(
    formInputValues.instructions
  );

  const formattedIngredients = parseIngredients(formInputValues.ingredients);

  const slug = slugify(formInputValues.name, { lower: true });

  return {
    ...formInputValues,
    slug,
    collections: { connect: formattedCollections },
    instructions: formattedInstructions,
    ingredients: [],
  };
}

function parseInstructionsForDB(instructions: string): string[] {
  return instructions
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function formatCollectionForDB(
  formInputValues: CollectionFormInput
): Prisma.CollectionCreateArgs["data"] {
  const slug = slugify(formInputValues.name, { lower: true });

  return {
    ...formInputValues,
    slug,
  };
}
