import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createIngredient, fetchIngredients } from "@/lib/api/ingredients";
import { IngredientDB } from "@/types";
import { IngredientFormInput } from "@/lib/validator";

export function useIngredients() {
  return useQuery<IngredientDB[], Error>({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
  });
}

export function useCreateIngredient() {
  const qc = useQueryClient();

  return useMutation<IngredientDB, Error, IngredientFormInput>({
    mutationFn: createIngredient,
    onSuccess: (newIng) => {
      qc.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });
}
