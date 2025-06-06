import { RecipeFormInput } from "@/lib/validator";
import { Prisma } from "@prisma/client";

export type RecipeDB = Prisma.RecipeGetPayload<{
  include: {
    collections: true;
  };
}>;

export type CollectionDB = Prisma.CollectionGetPayload<{}>;

export type RecipeFormInputWithId = RecipeFormInput & { id: string };
