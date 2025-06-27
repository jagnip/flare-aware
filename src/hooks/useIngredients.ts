import { useQuery } from "@tanstack/react-query";
import { fetchIngredients } from "@/lib/api/ingredients";

export function useIngredients() {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
  });
}
