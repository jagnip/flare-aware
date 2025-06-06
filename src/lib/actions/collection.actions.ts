"use server";
import { prisma } from "@/app/db/prisma";
import { convertToPlainObject } from "../utils";
import { CollectionDB } from "@/types";
import { CollectionFormInput, collectionSchema } from "../validator";
import slugify from "slugify";

export async function getCollections(): Promise<CollectionDB[]> {
  const data = await prisma.collection.findMany();
  return convertToPlainObject(data);
}

export async function getRecipesByCollectionSlug(
  slug: string
): Promise<CollectionDB | null> {
  const data = await prisma.collection.findFirst({
    where: { slug: slug },
    include: {
      recipes: {
        select: {
          id: true,
          name: true,
          slug: true,
          images: true,
          handsOnTime: true,
        },
      },
    },
  });

  return data;
}

async function createCollection(input: CollectionFormInput) {
  try {
    const parsed = collectionSchema.parse(input);
    const slug = slugify(parsed.name, { lower: true });

    const collection = await prisma.collection.create({
      data: { ...parsed, slug },
    });

    console.log("✅ Collection added:", collection);
  } catch (err) {
    if (err instanceof Error && "errors" in err) {
      console.error("❌ Zod validation failed:", (err as any).errors);
    } else {
      console.error("❌ An unexpected error occurred:", err);
    }
  }
}
