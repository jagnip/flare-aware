"use server";
import { prisma } from "@/app/db/prisma";
import { convertToPlainObject } from "../utils";

export async function getCollections() {
  const data = await prisma.collection.findMany({
    include: {
      recipes: true,
    },
  });

  return convertToPlainObject(data);
}
