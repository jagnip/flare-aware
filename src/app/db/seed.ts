import { PrismaClient } from "@prisma/client";
import { collections } from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.collection.createMany({ data: collections });

}

main();
