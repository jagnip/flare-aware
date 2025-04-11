

export type RecipeVariant = {
  id: string;
  name: string;
  recipeId: string;
  ingredients: Ingredient[];
  nutritionalValue: NutritionalValue | null;
};

export type Ingredient = {
  id: string;
  name: string;
  amount: string | null;
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

export type Collection = {
  id: string;
  name: string;
  slug: string;
  recipes?: RecipePreview[];
};

export type FullRecipe = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  servings: number | null;
  handsOnTime: number | null;
  handsOffTime: number | null;
  instructions: string[];
  notes: string | null;
  createdAt: Date;
  //relationships
  nutritionalValue: NutritionalValue | null;
  source: {
    id: string;
    name: string;
    url: string;
    recipeId: string;
  } | null;
  variants: RecipeVariant[];
  collections: Collection[];
  ingredients: Ingredient[];
};

export type RecipePreview = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  handsOnTime: number | null;
};
