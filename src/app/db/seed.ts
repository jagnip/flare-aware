import { PrismaClient } from "@prisma/client";
import { recipes as sampleData } from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.ingredient.deleteMany({});
  await prisma.nutritionalValue.deleteMany({});
  await prisma.source.deleteMany({});
  await prisma.recipe.deleteMany({});

  //   await prisma.recipe.createMany({ data: sampleData });
  for (const recipeData of sampleData) {
    const { ingredients, nutritionalValue, source, ...recipeFields } =
      recipeData;

    const recipe = await prisma.recipe.create({
      data: {
        ...recipeFields,
      },
    });

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
  }

  console.log("Database seeded successfully");
}

main();
