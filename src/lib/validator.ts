import { z } from 'zod';

const ingredientSchema = z.object({
  name: z.string().min(1, 'Ingredient name is required'),
  amount: z.string().optional(),
});

const sourceSchema = z.object({
  name: z.string().min(1, 'Source name is required'),
  url: z.string().url('Please provide a valid URL'),
});

export const recipeVariantSchema = z.object({
  name: z.string().min(3, 'Variant name must be at least 3 characters'),
  ingredients: z.array(ingredientSchema).optional().default([]),
});

export const insertRecipeSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  categories: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
  servings: z.number().int().positive().optional(),
  handsOnTime: z.number().int().nonnegative().optional(),
  handsOffTime: z.number().int().nonnegative().optional(),
  instructions: z.array(z.string()).optional().default([]),
  notes: z.string().optional(),
  ingredients: z.array(ingredientSchema).optional().default([]),
  source: sourceSchema.optional(),
  variants: z.array(recipeVariantSchema).optional().default([])
});


export type RecipeVariantInput = z.infer<typeof recipeVariantSchema>;
export type InsertRecipeInput = z.infer<typeof insertRecipeSchema>;