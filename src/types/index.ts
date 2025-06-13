import { RecipeFormInput } from "@/lib/validator";
import { Prisma } from "@prisma/client";

export type RecipeDB = Prisma.RecipeGetPayload<{
  include: {
    collections: true;
  };
}>;

export type CollectionDB = Prisma.CollectionGetPayload<{}>;

export type RecipeFormInputWithId = RecipeFormInput & { id: string };

export type IngredientDB = {
  ingredient: {
    name: string;
    iconUrl: string;
  };
  name: string;
  amount: string;
  unit: string;
  extraInfo?: string;
  rawIngredient: string;
};

export type IngredientDummyDB = {
  name: string;
  iconUrl: string;
};
