import { INGREDIENTS_MAP } from "@/app/db/ingredients";
import { INGREDIENT_UNITS, QUALITATIVE_INGREDIENT_AMOUNTS } from "@/lib/constants";
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
  
        const { amount, unit } = parseIngredientAmountAndUnit(preprocessedLine);
        const { ingredient } = fetchIngredientFromDB(preprocessedLine);
        const { extraInfo } = parseExtraInfo(preprocessedLine, {amount, unit, name:ingredient?.name || ""});
  
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
  } {
    const qualitativeAmountsRegex = QUALITATIVE_INGREDIENT_AMOUNTS.map((word) =>
      word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    ).join("|");
  
    const amountPattern = new RegExp(
      `(${qualitativeAmountsRegex}|\\d+\\s*[-–]\\s*\\d+|\\d+\\s+\\d+/\\d+|\\d+/\\d+|\\d+(\\.\\d+)?|[¼½¾⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])`,
      "i"
    );
  
    const amountMatch = ingredientLine.match(amountPattern);
    let amount = amountMatch ? amountMatch[0].trim() : "";
    let unit;
  
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
    if (!unit) {
      unit = words.find((word) => INGREDIENT_UNITS.includes(word)) || "";
    }
  
    return {
      amount,
      unit,
    };
  }

  function fetchIngredientFromDB(ingredientLine: string): {
    ingredient: { name: string; iconUrl: string } | null;
  } {
    const words = ingredientLine.split(" ");
    const singularWords = words.map((word) => pluralize.singular(word));
    const matchedKey = Object.keys(INGREDIENTS_MAP).find((key) =>
      singularWords.includes(key)
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
    { amount, unit, name }: {
    amount: string;
    unit: string;
   name: string; }
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