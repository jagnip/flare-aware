import { z } from "zod";

export const createSourceSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const createIngredientSchema = z.object({
  name: z.string(),
  amount: z.string().nullable().optional(),
});

export const createRecipeVariantSchema = z.object({
  name: z.string().min(1),
  ingredients: z.array(createIngredientSchema).optional(),
});

export const createCollectionSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

export const linkCollectionSchema = z.object({
  id: z.string().uuid(),
});

export const recipeCollectionSchema = z.union([
  createCollectionSchema,
  linkCollectionSchema,
]);

export const createRecipeSchema = z.object({
  name: z.string(),
  slug: z.string(),
  images: z.array(z.string()).optional(),
  servings: z.number().int().nullable().optional(),
  handsOnTime: z.number().int().nullable().optional(),
  handsOffTime: z.number().int().nullable().optional(),
  instructions: z.array(z.string()).optional(),
  notes: z.string().nullable().optional(),
  source: createSourceSchema.nullable().optional(),
  ingredients: z.array(createIngredientSchema).optional(),
  variants: z.array(createRecipeVariantSchema).optional(),
  collections: z.array(recipeCollectionSchema).optional(),
});

export const updateRecipeSchema = createRecipeSchema.extend({
  id: z.string().min(1, 'Id is required'),
});

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type CreateSourceInput = z.infer<typeof createSourceSchema>;
export type CreateIngredientInput = z.infer<typeof createIngredientSchema>;
export type CreateRecipeVariantInput = z.infer<
  typeof createRecipeVariantSchema
>;
export type CreateCollectionInput = z.infer<typeof createCollectionSchema>;
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>;