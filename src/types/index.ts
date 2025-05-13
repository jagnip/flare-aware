import { CreateRecipeVariantInput} from './../lib/validator';
import { CreateCollectionInput, CreateIngredientInput, CreateRecipeInput } from "@/lib/validator";

export type RecipeVariant = CreateRecipeVariantInput & {
  id: string;
  recipeId: string;
  nutritionalValue: NutritionalValue | null;
};

export type Ingredient = CreateIngredientInput & {
  id: string;
  recipeId: string | null;
  variantId: string | null;
};

export type NutritionalValue = {
  id: string;
  kcal: number;
  carbs: number;
  fat: number;
  protein: number;
  recipeId: string | null;
  variantId: string | null;
};

export type Collection = CreateCollectionInput & {
  id: string;
};

export type FullRecipe = CreateRecipeInput & {
  id: string;
  createdAt: Date;
  nutritionalValue: NutritionalValue | null;
};

export type RecipePreview = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  handsOnTime: number | null;
};
