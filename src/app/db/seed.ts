import { PrismaClient } from "@prisma/client";
import { recipes as sampleData } from "./sample-data";

async function main() {
  const prisma = new PrismaClient();

  await prisma.ingredient.deleteMany({});
  await prisma.nutritionalValue.deleteMany({});
  await prisma.source.deleteMany({});
  await prisma.recipeVariant.deleteMany({});
  await prisma.recipe.deleteMany({});

  for (const recipeData of sampleData) {
    const { ingredients, nutritionalValue, source, variants, ...recipeFields } =
      recipeData;

    const recipe = await prisma.recipe.create({
      data: {
        ...recipeFields,
      },
    });

    // Create ingredients
    if (ingredients) {
      for (const ingredient of ingredients) {
        await prisma.ingredient.create({
          data: {
            ...ingredient,
            recipeId: recipe.id,
          },
        });
      }
    }

    // Create nutritional value
    if (nutritionalValue) {
      await prisma.nutritionalValue.create({
        data: {
          ...nutritionalValue,
          recipeId: recipe.id,
        },
      });
    }

    // Create source
    if (source) {
      await prisma.source.create({
        data: {
          ...source,
          recipeId: recipe.id,
        },
      });
    }

    // Create variants
    if (variants) {
      for (const variant of variants) {
        const {
          ingredients: variantIngredients,
          nutritionalValue: variantNutrition,
          ...variantFields
        } = variant;

        const variantRecord = await prisma.recipeVariant.create({
          data: {
            ...variantFields,
            recipeId: recipe.id,
          },
        });

        if (variantIngredients) {
          for (const ingredient of variantIngredients) {
            await prisma.ingredient.create({
              data: {
                ...ingredient,
                variantId: variantRecord.id,
              },
            });
          }
        }

        if (variantNutrition) {
          await prisma.nutritionalValue.create({
            data: {
              ...variantNutrition,
              variantId: variantRecord.id,
            },
          });
        }
      }
    }
  }

  console.log("Database seeded successfully");
}

main();