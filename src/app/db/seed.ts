import { PrismaClient } from "@prisma/client";
import { collections, ingredients } from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.collection.createMany({ data: collections });
  await prisma.ingredient.createMany({ data: ingredients });
}

main();
