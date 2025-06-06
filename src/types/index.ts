import { RecipeFormInput } from "@/lib/validator";
import { Prisma } from "@prisma/client";

export type RecipeDB = Prisma.RecipeGetPayload<{
  include: {
    collections: true;
  };
}>;

export type CollectionDB = Prisma.CollectionGetPayload<{}>;

export type IngredientDB = {
  quantity: number;
  quantityText: string;
  minQuantity: number;
  maxQuantity: number;
  unit: string;
  unitText: string;
  ingredient: string;
  extra: string;
  alternativeQuantities: {
    quantity: number;
    unit: string;
    unitText: string;
    minQuantity: number;
    maxQuantity: number;
  }[];
};

export type RecipeWithId = RecipeFormInput & { id: string };