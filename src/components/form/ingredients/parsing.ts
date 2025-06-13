import { INGREDIENTS_MAP } from "@/app/db/ingredients";
import {
  INGREDIENT_UNITS,
  QUALITATIVE_INGREDIENT_AMOUNTS,
} from "@/lib/constants";
import pluralize from "pluralize";
import nlp from "compromise";

export function parseIngredients(ingredients: string): any[] {
  return ingredients
    .split("\n")
    .map((line: string) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
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
        fetchIngredientFromDB(lineWithoutAmountAndUnit);

      const extraInfo = lineWithoutAmountUnitAndIngredient;

      console.log("Parsed ingredient:", {
        ingredient,
        name,
        amount,
        unit,
        extraInfo,
      });

      return {
        ingredient,
        name,
        amount,
        unit,
        extraInfo,
        rawIngredient: line.trim(),
      };
    });
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


function fetchIngredientFromDB(lineWithoutAmountAndUnit: string): {
  ingredient: { name: string; iconUrl: string } | null;
  name: string;
  lineWithoutAmountUnitAndIngredient: string;
} {
  // Extract noun phrases using compromise
  const doc = nlp(lineWithoutAmountAndUnit);
  const nounPhrases = doc.nouns().out("array");

  // Lowercased ingredient names for matching
  const normalizedIngredients = new Set(
    Object.keys(INGREDIENTS_MAP).map((key) => key.toLowerCase())
  );

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
  outer: for (const phrase of nounPhrases) {
    const words = phrase.toLowerCase().split(" ");
    for (let i = words.length; i > 0; i--) {
      const variations = generateCombinations(words, i);
      for (const variant of variations) {
       
        const candidate = variant.join(" ");
        const singular = pluralize.singular(candidate);
        const plural = pluralize.plural(candidate);
        if (
          normalizedIngredients.has(candidate) ||
          normalizedIngredients.has(singular) ||
          normalizedIngredients.has(plural)
        ) {
          bestGuess = normalizedIngredients.has(candidate)
            ? candidate
            : normalizedIngredients.has(singular)
            ? singular
            : plural;
          break outer;
        }
      }
    }
  }
  // Fallback: use the last noun phrase as the guessed ingredient
  if (!bestGuess && nounPhrases.length > 0) {
    bestGuess = nounPhrases.at(-1)?.toLowerCase().trim() || "";
  }

  const matchedKey = Object.keys(INGREDIENTS_MAP).find(
    (key) => key.toLowerCase() === bestGuess
  );

  const ingredient = matchedKey
    ? INGREDIENTS_MAP[matchedKey as keyof typeof INGREDIENTS_MAP]
    : null;

  const lineWords = lineWithoutAmountAndUnit.toLowerCase().split(" ");
  const nameWords = bestGuess.split(" ");
  const lineWithoutAmountUnitAndIngredient = lineWords
    .filter((word) => !nameWords.includes(word))
    .join(" ")
    .trim();

  return {
    ingredient,
    name: matchedKey ? matchedKey : bestGuess,
    lineWithoutAmountUnitAndIngredient,
  };
}