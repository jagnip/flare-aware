import { INGREDIENT_CATEGORIES } from "@/lib/constants";
import { RecipeFormInput } from "@/lib/validator";
import { Prisma } from "@prisma/client";

export type RecipeDB = Prisma.RecipeGetPayload<{
  include: {
    collections: true;
  };
}>;

export type CollectionDB = Prisma.CollectionGetPayload<{}>;

export type RecipeFormInputWithId = RecipeFormInput & { id: string };

export type UserIngredientDB = {
  ingredient: IngredientDB | null;
  name: string;
  amount: string;
  unit: string;
  extraInfo?: string;
};

export type IngredientDB = Prisma.IngredientGetPayload<{}>;

export type IngredientCategory = keyof typeof INGREDIENT_CATEGORIES;