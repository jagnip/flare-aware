import { z } from "zod";


export const collectionSchema = z.object({
  name: z.string().min(1, "Collection name is required"),
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
  ingredients: z.string(),
  source: z.string().optional(),
  collections: z.array(z.string()),
});

export type RecipeFormInput = z.infer<typeof recipeSchema>;
export type CollectionFormInput = z.infer<typeof collectionSchema>;
