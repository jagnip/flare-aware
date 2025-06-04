import { CollectionFormInput } from "../validator";
import { prisma } from "@/app/db/prisma";
import { collectionSchema } from "../validator";
import slugify from "slugify";

async function testCreateCollection(input: CollectionFormInput) {
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

testCreateCollection({
  name: "Desserts",
});
