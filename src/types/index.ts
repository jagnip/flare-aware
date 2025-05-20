import { Prisma } from "@prisma/client";

export type Recipe = Prisma.RecipeGetPayload<{
  include: {
    collections: true;
  };
}>;

export type Collection = Prisma.CollectionGetPayload<{}>;
