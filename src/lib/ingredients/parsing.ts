import {
  API_ROUTES,
  INGREDIENT_UNITS,
  QUALITATIVE_INGREDIENT_AMOUNTS,
} from "@/lib/constants";
import pluralize from "pluralize";
import nlp from "compromise";
import { IngredientDB, UserIngredientDB } from "@/types";

export async function parseIngredients(
  ingredients: string
): Promise<UserIngredientDB[]> {
  const lines = ingredients
    .split("\n")
    .map((line: string) => line.trim())
    .filter((line) => line.length > 0);

  const parsed = await Promise.all(
    lines.map(async (line) => {
      const preprocessedLine = line
        .toLowerCase()
        .replace(
          /(\d+|\d+\/\d+|\d+[¼½¾⅓⅔⅛]?)\s?(g|kg|ml|l|tsp|tbsp|cups?)/gi,
          "$1 $2"
        )
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
        .replace(/\s+/g, " ")
        .trim();

      const { amount, unit, lineWithoutAmountAndUnit } =
        parseIngredientAmountAndUnit(preprocessedLine);

      const { ingredient, name, lineWithoutAmountUnitAndIngredient } =
        await fetchIngredientFromDB(lineWithoutAmountAndUnit);

      return {
        ingredient,
        name,
        amount,
        unit,
        extraInfo: lineWithoutAmountUnitAndIngredient,
        rawIngredient: line.trim(),
      };
    })
  );

  return parsed;
}

function parseIngredientAmountAndUnit(ingredientLine: string): {
  amount: string;
  unit: string;
  lineWithoutAmountAndUnit: string;
} {
  let unit;

  //Regex for qualitative amounts
  const qualitativeAmountsRegex = QUALITATIVE_INGREDIENT_AMOUNTS.map((word) =>
    word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  ).join("|");

  //Regex for numeric or qualitative amounts
  const amountPattern = new RegExp(
    `(${qualitativeAmountsRegex}|\\d+\\s*[-–]\\s*\\d+|\\d+\\s+\\d+/\\d+|\\d+/\\d+|\\d+(\\.\\d+)?|[¼½¾⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])`,
    "i"
  );
  const matchedAmount = ingredientLine.match(amountPattern);
  let amount = matchedAmount ? matchedAmount[0].trim() : "";

  //Handle cases like "a pinch of salt" by setting both amount and unit to "pinch".
  const qualitativeAmount = QUALITATIVE_INGREDIENT_AMOUNTS.find((word) =>
    ingredientLine.includes(word)
  );
  if (
    amount &&
    qualitativeAmount &&
    amount.toLowerCase().includes(qualitativeAmount)
  ) {
    amount = qualitativeAmount.trim();
    unit = qualitativeAmount.trim();
  }

  const words = ingredientLine.split(" ");

  //Try to find a standard unit if not already set as qualitative amount
  if (!unit) {
    unit = words.find((word) => INGREDIENT_UNITS.includes(word)) || "";
  }

  //Fallback to “pc” if you found a number but no unit
  const isAmountNumeric =
    /^(\d+\s*[-–]?\s*\d+|\d+\s+\d+\/\d+|\d+\/\d+|\d+(\.\d+)?|[¼½¾⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])$/;
  if (amount && !unit && isAmountNumeric.test(amount.trim())) {
    unit = "pc";
  }

  // Remove amount and unit from the line to get the remaining part
  const escapeRegex = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const amountRegex = amount
    ? new RegExp(`${escapeRegex(amount)}`, "gi")
    : null;
  const unitRegex = unit
    ? new RegExp(`\\b${escapeRegex(unit)}\\b`, "gi")
    : null;

  let remainingLine = ingredientLine;
  if (amountRegex) remainingLine = remainingLine.replace(amountRegex, "");
  if (unitRegex) remainingLine = remainingLine.replace(unitRegex, "");

  return {
    lineWithoutAmountAndUnit: remainingLine.trim().replace(/\s{2,}/g, " "),
    amount,
    unit,
  };
}

async function fetchIngredientFromDB(
  lineWithoutAmountAndUnit: string
): Promise<{
  ingredient: IngredientDB | null;
  name: string;
  lineWithoutAmountUnitAndIngredient: string;
}> {
  // Extract noun phrases using compromise
  const doc = nlp(lineWithoutAmountAndUnit);
  const nounPhrases = doc.nouns().out("array");
  const safeNounPhrases =
    nounPhrases.length > 0 ? nounPhrases : [lineWithoutAmountAndUnit];

  // Helper to generate all combinations of a phrase by removing one word at a time
  const generateCombinations = (words: string[], size: number): string[][] => {
    if (size === words.length) return [words];
    const results: string[][] = [];
    for (let i = 0; i < words.length; i++) {
      const reduced = [...words.slice(0, i), ...words.slice(i + 1)];
      if (reduced.length === size) results.push(reduced);
    }
    return results;
  };

  let bestGuess = "";
  let match: IngredientDB | null = null;
  outer: for (const phrase of safeNounPhrases) {
    const words = phrase.toLowerCase().split(" ");
    for (let i = words.length; i > 0; i--) {
      const variations = generateCombinations(words, i);
      for (const variant of variations) {
        const candidate = variant.join(" ");

        // Check if the candidate is a known ingredient
        const res = await fetch(API_ROUTES.INGREDIENT_SEARCH, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: candidate }),
        });

        match = await res.json();

        if (match) {
          bestGuess = match.name;
          break outer;
        }
      }
    }
  }
  // Fallback: use the last noun phrase as the guessed ingredient
  if (!bestGuess && nounPhrases.length > 0) {
    bestGuess = nounPhrases.at(-1)?.toLowerCase().trim() || "";
  }

  const lineWords = lineWithoutAmountAndUnit.toLowerCase().split(" ");
  const nameWords = bestGuess
    .split(" ")
    .map((w) => pluralize.singular(w.toLowerCase()));

  const lineWithoutAmountUnitAndIngredient = lineWords
    .filter((word) => !nameWords.includes(pluralize.singular(word)))
    .join(" ")
    .trim();

  return {
    ingredient: match,
    name: match ? match.name : bestGuess,
    lineWithoutAmountUnitAndIngredient,
  };
}
