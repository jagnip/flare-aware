import {
  insertIngredientSchema,
  insertSourceSchema,
  insertCollectionSchema,
  insertRecipeVariantSchema,
  insertRecipeSchema,
} from "@/lib/validator";
import { z } from "zod";

export type Ingredient = z.infer<typeof insertIngredientSchema> & {
  id: string;
  recipeId?: string | null;
  variantId?: string | null;
};

export type NutritionalValue = {
  id: string;
  kcal: number;
  carbs: number;
  fat: number;
  protein: number;
  recipeId?: string | null;
  variantId?: string | null;
};

export type Source = z.infer<typeof insertSourceSchema> & {
  id: string;
  recipeId: string;
};

export type Collection = z.infer<typeof insertCollectionSchema> & {
  id: string;
  slug: string;
  recipes?: Recipe[]; 
};

export type RecipeVariant = z.infer<typeof insertRecipeVariantSchema> & {
  id: string;
  recipeId: string;
  ingredients: Ingredient[];
  nutritionalValue: NutritionalValue;
};

export type Recipe = z.infer<typeof insertRecipeSchema> & {
  id: string;
  slug: string;
  createdAt: Date;
  collections: Collection[];
  ingredients: Ingredient[];
  nutritionalValue?: NutritionalValue | null;
  source?: Source | null;
  variants: RecipeVariant[];
};