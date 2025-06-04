import { RecipeFormInput, recipeSchema } from "../validator";
import { prisma } from "@/app/db/prisma";
import slugify from "slugify";
import { normalizeRecipeFormData } from "../actions/utils";

async function createRecipe(input: RecipeFormInput) {
  try {
    const parsed = recipeSchema.parse(input);
    const normalized = normalizeRecipeFormData(parsed);
    const slug = slugify(parsed.name, { lower: true });
    const { collections, ...rest } = normalized;

    const recipe = await prisma.recipe.create({
      data: {
        ...rest,
        slug,
        collections: {
          connect: collections.map((id) => ({ id })),
        },
      },
    });

    console.log("✅ Collection added:", recipe);
  } catch (err) {
    if (err instanceof Error && "errors" in err) {
      console.error("❌ Zod validation failed:", (err as any).errors);
    } else {
      console.error("❌ An unexpected error occurred:", err);
    }
  }
}

const input = {
  name: "Rosol",
  images: ["/images/recipe.jpg"],
  servings: 4,
  handsOnTime: 10,
  handsOffTime: 40,
  instructions: [
    "Take ripe mangoes and peel them.",
    "Add mangoes to a blender.",
    "Blend until smooth.",
    "Pour into a container and freeze for 4 hours.",
    "Scoop and serve.",
  ],
  notes: "Great with cinnamon on top",
  ingredients: [
    { name: "mango", quantity: 150, unit: "g" },
    { name: "cottage cheese", quantity: 500, unit: "g" },
  ],
  source: {
    name: "Family Recipe",
    url: "https://example.com/mango",
  },
  collections: [
    "00000000-0000-0000-0000-000000000001",
    "00000000-0000-0000-0000-000000000002",
  ],
};

createRecipe(input);
