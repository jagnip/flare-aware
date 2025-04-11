"use server";
import { prisma } from "@/app/db/prisma";
import { convertToPlainObject } from "../utils";
import { Collection } from "@/types";

export async function getCollections(): Promise<Collection[]> {
  const data = await prisma.collection.findMany();
  return convertToPlainObject(data);
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const data = await prisma.collection.findFirst({
    where: { slug: slug },
    include: {
      recipes: {
        select: {
          id: true,
          name: true,
          slug: true,
          images: true,
          handsOnTime: true
        }
      }
    }
  });

  return data;
  
}