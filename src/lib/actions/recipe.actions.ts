"use server";
import { prisma } from "@/app/db/prisma";
import { convertToPlainObject } from "../utils";
import { Recipe, RecipePreview } from "@/types";
import { revalidatePath } from "next/cache";
import { createRecipeSchema, updateRecipeSchema } from "../validator";
import { z } from "zod";
import { ROUTES } from "../constants";

export async function getRecipePreviews(): Promise<RecipePreview[]> {
  const data = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      images: true,
      handsOnTime: true,
    },
  });

  return convertToPlainObject(data);
}

export async function getRecipeBySlug(
  slug: string
): Promise<Recipe | null> {
  return await prisma.recipe.findFirst({
    where: { slug: slug },
    include: {
      collections: true,
      ingredients: true,
      nutritionalValue: true,
      source: true,
      variants: {
        include: {
          ingredients: true,
          nutritionalValue: true,
        },
      },
    },
  });
}

export async function deleteRecipe(id: string) {
  try {
    const recipe = await prisma.recipe.findFirst({
      where: { id },
    });

    if (!recipe) throw new Error("Recipe not found");

    const slug = recipe.slug;
    await prisma.recipe.delete({ where: { id } });

    revalidatePath(ROUTES.HOME);
    revalidatePath(ROUTES.COLLECTIONS);
    revalidateRecipeCollections(slug);
    return {
      success: true,
      message: "Recipe deleted successfully",
    };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function createRecipe(data: z.infer<typeof createRecipeSchema>) {
  try {
    const { source, collections, ingredients, variants, ...rest } =
      createRecipeSchema.parse(data);
    await prisma.recipe.create({
      data: {
        ...rest,
        ...(source ? { source: { create: source } } : {}),
        ...(collections
          ? {
              collections: {
                create: collections.filter(
                  (c): c is { name: string; slug: string } => "name" in c
                ),
                connect: collections
                  .filter((c): c is { id: string } => "id" in c)
                  .map((c) => ({ id: c.id })),
              },
            }
          : {}),
        ...(ingredients ? { ingredients: { create: ingredients } } : {}),
        ...(variants
          ? {
              variants: {
                create: variants.map((variant) => ({
                  name: variant.name,
                  ...(variant.ingredients
                    ? { ingredients: { create: variant.ingredients } }
                    : {}),
                })),
              },
            }
          : {}),
      },
    });

    revalidatePath(ROUTES.HOME);
    revalidatePath(ROUTES.COLLECTIONS);
    revalidateRecipeCollections(rest.slug);

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    return { success: false, message: error };
  }
}

export async function updateRecipe(data: z.infer<typeof updateRecipeSchema>) {
  try {
    const { id, slug, source, collections, ingredients, variants, ...rest } =
      updateRecipeSchema.parse(data);

    const existingRecipe = await prisma.recipe.findFirst({
      where: { id },
      include: {
        source: true,
        ingredients: true,
        collections: true,
        variants: {
          include: { ingredients: true },
        },
      },
    });

    if (!existingRecipe) throw new Error('Recipe not found');

    const flatChanged = Object.entries(rest).some(
      ([key, val]) => val !== (existingRecipe as any)[key]
    );

    if (flatChanged) {
      await prisma.recipe.update({ where: { id }, data: { ...rest } });
    }

    if (source && JSON.stringify(existingRecipe.source) !== JSON.stringify(source)) {
      await prisma.source.upsert({
        where: { recipeId: id },
        update: source,
        create: { ...source, recipeId: id },
      });
    }


    const existingIngredients = existingRecipe.ingredients.map(({ name, amount }) => ({ name, amount }));
    const newIngredients = ingredients || [];
    const ingredientsChanged =
      JSON.stringify(existingIngredients) !== JSON.stringify(newIngredients);

    if (ingredientsChanged) {
      await prisma.ingredient.deleteMany({ where: { recipeId: id } });
      await prisma.ingredient.createMany({
        data: newIngredients.map((i) => ({ ...i, recipeId: id })),
      });
    }

    if (collections) {
      await prisma.recipe.update({
        where: { id },
        data: {
          collections: {
            set: [],
            connect: collections
              .filter((c): c is { id: string } => 'id' in c)
              .map((c) => ({ id: c.id })),
            create: collections.filter(
              (c): c is { name: string; slug: string } => 'name' in c
            ),
          },
        },
      });
    }

    if (variants) {
      await prisma.recipeVariant.deleteMany({ where: { recipeId: id } });

      for (const variant of variants) {
        const createdVariant = await prisma.recipeVariant.create({
          data: {
            name: variant.name,
            recipeId: id,
          },
        });

        if (variant.ingredients) {
          await prisma.ingredient.createMany({
            data: variant.ingredients.map((i) => ({
              ...i,
              variantId: createdVariant.id,
            })),
          });
        }
      }
    }

    revalidatePath(ROUTES.HOME);
    revalidatePath(ROUTES.COLLECTIONS);
    await revalidateRecipeCollections(slug);

    return {
      success: true,
      message: 'Recipe updated successfully',
    };
  } catch (error) {
    return { success: false, message: error };
  }
}

async function revalidateRecipeCollections(slug: string) {
  const recipe = await prisma.recipe.findFirst({
    where: { slug },
    include: { collections: true },
  });

  if (!recipe) return;

  recipe.collections.forEach(({ slug }) => {
    revalidatePath(ROUTES.COLLECTION_DETAIL(slug));
  });

  revalidatePath(ROUTES.HOME);
  revalidatePath(ROUTES.COLLECTIONS);
}
