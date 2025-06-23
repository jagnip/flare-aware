import { z } from "zod";

export const collectionSchema = z.object({
  name: z.string().min(1, "Collection name is required"),
});

export const userIngredientSchema = z.object({
  ingredientId: z.string().uuid(),
  name: z.string().min(1),
  amount: z.string().min(1),
  unit: z.string().min(1),
  extraInfo: z.string().optional(),
});

export const recipeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  images: z.array(z.string()),
  servings: z.coerce
    .number()
    .int()
    .min(1, { message: "Must be a whole number ≥ 1" }),
  handsOnTime: z.coerce
    .number()
    .int()
    .min(0, { message: "Must be a whole number ≥ 1" }),
  handsOffTime: z.coerce
    .number()
    .int()
    .min(0, { message: "Must be a whole number ≥ 0" }),
  instructions: z.string(),
  notes: z.string().optional(),
  ingredients: z.string().min(1, "Name is required"),
  // ingredients: z
  //   .array(userIngredientSchema)
  //   .min(1, "Add at least one ingredient"),
  source: z.string().optional(),
  collections: z.array(z.string()),
});

export const ingredientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  iconFile: z.string().min(1, "Icon is required"),
  calories: z.coerce.number().min(1, "Calories must be 1 or greater"),
  protein: z.coerce.number().min(0, "Protein must be 0 or greater"),
  fat: z.coerce.number().min(0, "Fat must be 0 or greater"),
  carbs: z.coerce.number().min(0, "Carbs must be 0 or greater"),
  density: z.coerce.number().min(0.1, "Density must be greater than 0.1"),
});

export type RecipeFormInput = z.infer<typeof recipeSchema>;
export type CollectionFormInput = z.infer<typeof collectionSchema>;
export type IngredientFormInput = z.infer<typeof ingredientSchema>;
export type UserIngredientFormInput = z.infer<typeof userIngredientSchema>;
