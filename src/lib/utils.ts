import { prisma } from "@/app/db/prisma";
import { clsx, type ClassValue } from "clsx"
import { revalidatePath } from "next/cache";
import { twMerge } from "tailwind-merge"
import { ROUTES } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Convert the Prisma result to a plain JavaScript object.
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

