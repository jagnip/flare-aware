import { z } from 'zod';

export const insertIngredientSchema = z.object({
  name: z.string().min(1, 'Ingredient name is required'),
  amount: z.string().optional(),
});

export const insertSourceSchema = z.object({
  name: z.string().min(1, 'Source name is required'),
  url: z.string().url('Please provide a valid URL'),
});

export const insertCollectionSchema = z.object({
  name: z.string().min(1, 'Category name is required'),
});

export const insertRecipeVariantSchema = z.object({
  name: z.string().min(3, 'Variant name must be at least 3 characters'),
  ingredients: z.array(insertIngredientSchema).optional().default([]),
});


export const insertRecipeSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  collections: z.array(insertCollectionSchema).optional().default([]),
  images: z.array(z.string()).optional().default([]),
  servings: z.number().int().positive().optional(),
  handsOnTime: z.number().int().nonnegative().optional(),
  handsOffTime: z.number().int().nonnegative().optional(),
  instructions: z.array(z.string()).optional().default([]),
  notes: z.string().optional(),
  ingredients: z.array(insertIngredientSchema).optional().default([]),
  source: insertSourceSchema.optional(),
  variants: z.array(insertRecipeVariantSchema).optional().default([])
});

export type RecipeVariantInput = z.infer<typeof insertRecipeVariantSchema>;
export type InsertRecipeInput = z.infer<typeof insertRecipeSchema>;