import { Collection } from "@/types";
import { RecipeFormInput, recipeSchema } from "../validator";
import {
  parseIngredient
} from "@jlucaspains/sharp-recipe-parser";


export function normalizeRecipeFormInput(input: RecipeFormInput, collections: Collection[]) {

    const parsed = recipeSchema.parse(input);
    const parsedCollections = parsed.collections.map((name) => {
      const match = collections.find((c) => c.name === name);
      if (!match) {
        throw new Error(`Collection with name "${name}" not found`);
      }
      return { id: match.id };
    });

    const parsedInstructions = parsed.instructions ?
    parsed.instructions.split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0) : [];
  

    const parsedIngredients = parsed.ingredients.split("\n")
    .map((ingredient) => parseIngredient(ingredient, "en", {
      includeAlternativeUnits: true,
      includeExtra: true,
    }))

    return {...parsed, collections: parsedCollections, instructions: parsedInstructions, ingredients: parsedIngredients};
};

 

