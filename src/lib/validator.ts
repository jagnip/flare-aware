import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  quantity: z.number().int().positive().optional(),
  unit: z.string().optional(),
});

export const sourceSchema = z
  .object({
    name: z.string().optional(),
    url: z.string().url("Invalid URL").optional(),
  })
  .optional();

export const collectionSchema = z.object({
  name: z.string().min(1, "Collection name is required"),
});

export const recipeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  images: z.array(z.string()),
  servings: z
    .union([
      z.string().refine((val) => val === "" || /^[1-9]\d*$/.test(val), {
        message: "Must be a whole number ≥ 1 or empty",
      }),
      z.number().int().min(1),
    ])
    .optional(),
  handsOnTime: z
    .union([
      z.string().refine((val) => val === "" || /^[1-9]\d*$/.test(val), {
        message: "Must be a whole number ≥ 1 or empty",
      }),
      z.number().int().min(1),
    ])
    .optional(),
  handsOffTime: z
    .union([
      z.string().refine((val) => val === "" || /^\d+$/.test(val), {
        message: "Must be a whole number ≥ 1 or empty",
      }),
      z.number().int().min(0),
    ])
    .optional(),
  instructions: z.string().min(1, "Instructions are required"),
  notes: z.string().optional(),
  ingredients: z.string(),
  source: z.string().optional(),
  collections: z.array(z.string()),

});

export type recipeFormType = z.infer<typeof recipeSchema>;
export type collectionFormType = z.infer<typeof collectionSchema>;
