import { useQuery } from "@tanstack/react-query";
import { fetchIngredients } from "@/lib/api/ingredients";
import { IngredientDB } from "@/types";

export function useIngredients() {
  return useQuery<IngredientDB[], Error>({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
  });
}
