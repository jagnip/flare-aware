import { prisma } from "@/app/db/prisma";
import { revalidatePath } from "next/cache";
import { ROUTES } from "../constants";
import { recipeFormType } from "../validator";

export function normalizeRecipeFormData(input: recipeFormType) {
  return {
    ...input,
    servings: input.servings === "" ? null : Number(input.servings),
    handsOnTime: input.handsOnTime === "" ? null : Number(input.handsOnTime),
    handsOffTime: input.handsOffTime === "" ? null : Number(input.handsOffTime),
  };
}
