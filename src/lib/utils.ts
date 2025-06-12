import { prisma } from "@/app/db/prisma";
import { clsx, type ClassValue } from "clsx"
import { revalidatePath } from "next/cache";
import { twMerge } from "tailwind-merge"
import { ROUTES } from "./constants";
import pluralize from "pluralize";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Convert the Prisma result to a plain JavaScript object.
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

const UNCOUNTABLE_UNITS = new Set(["g", "kg", "ml", "l", "tsp", "tbsp"]);

export function getDisplayUnit(option: string, amount: string): string {
  if (!option) return "";
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 1) return option;

  if (UNCOUNTABLE_UNITS.has(option)) return option;

  return pluralize(option);
}