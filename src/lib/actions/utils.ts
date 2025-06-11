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

  const formattedIngredients = parseIngredientsForDB(
    formInputValues.ingredients
  );

  console.log("Formatted Ingredients:", formattedIngredients);

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

function parseIngredientsForDB(instructions: string): any[] {
  return instructions
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const { amount, unit } = parseIngredientAmountAndUnit(line);
      const { ingredient } = parseIngredientName(line);

      return {
        ingredient,
        amount,
        unit,
        rawIngredient: line.trim(),
      };
    });
}

function parseIngredientAmountAndUnit(rawIngredient: string): {
  amount: string;
  unit: string;
} {
  //preprocessing to avoid 10 g appearing as 10g instead of 10 g
  const lowerLine = rawIngredient
    .toLowerCase()
    .replace(
      /(\d+|\d+\/\d+|\d+[¼½¾⅓⅔⅛]?)\s?(g|kg|ml|l|tsp|tbsp|cups?)/gi,
      "$1 $2"
    );

  // Create a regex pattern to match qualitative ingredient amounts
  const qualitativeAmountsRegex = QUALITATIVE_INGREDIENT_AMOUNTS.map((word) =>
    word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  ).join("|");

  const amountPattern = new RegExp(
    `(${qualitativeAmountsRegex}|\\d+\\s*[-–]\\s*\\d+|\\d+\\s+\\d+/\\d+|\\d+/\\d+|\\d+(\\.\\d+)?|[¼½¾⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])`,
    "i"
  );

  // Match the amount using the regex pattern
  const amountMatch = rawIngredient.match(amountPattern);
  let amount = amountMatch ? amountMatch[0].trim() : "";
  let unit;

  // Check if the line includes a qualitative amount phrase like "a handful", otherwise undefined
  const qualitativeAmount = QUALITATIVE_INGREDIENT_AMOUNTS.find((word) =>
    lowerLine.includes(word)
  );

  // If the match is a qualitative phrase like "a handful", normalize amount to "1"
  if (
    amount &&
    qualitativeAmount &&
    amount.toLowerCase().includes(qualitativeAmount)
  ) {
    amount = qualitativeAmount.trim();
    unit = qualitativeAmount.trim();
  }

  // If unit isn't qualitative, try to find a standard unit from the tokenized line
  const tokens = lowerLine.split(" ");
  if (!unit) {
    unit = tokens.find((token) => INGREDIENT_UNITS.includes(token)) || "";
  }

  return {
    amount,
    unit,
  };
}

function parseIngredientName(rawIngredient: string): {
  ingredient: { name: string; iconUrl: string } | null;
} {
  // Preprocess: lowercase, remove punctuation, split into words
  const words = rawIngredient
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
    .split(" ");

  // Singularize each word
  const singularWords = words.map((word) => pluralize.singular(word));

  // Try to find a matching ingredient name in INGREDIENTS_MAP
  const matchedKey = Object.keys(INGREDIENTS_MAP).find((key) =>
    singularWords.includes(key)
  );

  // Return matched ingredient or null
  return {
    ingredient:
      matchedKey && matchedKey in INGREDIENTS_MAP
        ? INGREDIENTS_MAP[matchedKey as keyof typeof INGREDIENTS_MAP]
        : null,
  };
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
