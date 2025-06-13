import { INGREDIENTS_MAP } from "@/app/db/ingredients";
import {
  INGREDIENT_UNITS,
  QUALITATIVE_INGREDIENT_AMOUNTS,
} from "@/lib/constants";
import pluralize from "pluralize";

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

      const { amount, unit, remainingLine } =
        parseIngredientAmountAndUnit(preprocessedLine);
      const { ingredient } = fetchIngredientFromDB(preprocessedLine);
      const { extraInfo } = parseExtraInfo(preprocessedLine, {
        amount,
        unit,
        name: ingredient?.name || "",
      });

      console.log("Parsed ingredient:", {
        ingredient,
        amount,
        unit,
        remainingLine,
        extraInfo,
      });

      return {
        ingredient,
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
  remainingLine: string;
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
    remainingLine: remainingLine.trim().replace(/\s{2,}/g, " "),
    amount,
    unit,
  };
}

function fetchIngredientFromDB(ingredientLine: string): {
  ingredient: { name: string; iconUrl: string } | null;
} {
  const words = ingredientLine.toLowerCase().split(" ");

  const normalizedWords = new Set(
    words.flatMap((word) => [
      pluralize.singular(word).toLowerCase(),
      pluralize.plural(word).toLowerCase(),
    ])
  );

  const matchedKey = Object.keys(INGREDIENTS_MAP).find((key) =>
    normalizedWords.has(key.toLowerCase())
  );

  return {
    ingredient:
      matchedKey && matchedKey in INGREDIENTS_MAP
        ? INGREDIENTS_MAP[matchedKey as keyof typeof INGREDIENTS_MAP]
        : null,
  };
}

function parseExtraInfo(
  ingredientLine: string,
  {
    amount,
    unit,
    name,
  }: {
    amount: string;
    unit: string;
    name: string;
  }
): {
  extraInfo: string;
} {
  const words = ingredientLine.split(" ");

  const wordsToRemove = new Set([
    ...(amount?.toLowerCase().split(" ") || []),
    ...(unit?.toLowerCase().split(" ") || []),
    pluralize.singular(name || "").toLowerCase(),
    pluralize.plural(name || "").toLowerCase(),
  ]);
  const extraInfo = words
    .filter((word) => !wordsToRemove.has(word))
    .join(" ")
    .trim();

  return {
    extraInfo,
  };
}
