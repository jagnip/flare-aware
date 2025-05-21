import { prisma } from "@/app/db/prisma";
import { revalidatePath } from "next/cache";
import { ROUTES } from "../constants";
import { recipeForm } from "../validator";

  export function normalizeRecipeFormData(input: recipeForm) {
    return {
      ...input,
      servings: input.servings === "" ? null : Number(input.servings),
      handsOnTime: input.handsOnTime === "" ? null : Number(input.handsOnTime),
      handsOffTime: input.handsOffTime === "" ? null : Number(input.handsOffTime),
    };
  }