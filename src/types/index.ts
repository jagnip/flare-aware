import { insertRecipeSchema } from "@/lib/validator";
import { z } from "zod";

export type Recipe = z.infer<typeof insertRecipeSchema> & {
  id: string;
  slug: string;
  createdAt: Date;
};
