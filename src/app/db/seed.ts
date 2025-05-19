import { PrismaClient } from "@prisma/client";
import { recipes, collections } from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.collection.createMany({ data: collections });

  for (const recipe of recipes) {
    const { collections, ...rest } = recipe;
  
    await prisma.recipe.create({
      data: {
        ...rest,
        collections: {
          connect: collections.map((id) => ({ id }))
        }
      }
    });
  }
}

main();
