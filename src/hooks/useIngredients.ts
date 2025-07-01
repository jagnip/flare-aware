import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createIngredient, deleteIngredient, fetchIngredients, updateIngredient } from "@/lib/api/ingredients";
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

export function useUpdateIngredient() {
  const qc = useQueryClient();

  return useMutation<IngredientDB, Error, { id: number; data: IngredientFormInput }>({
    mutationFn: ({ id, data }) => updateIngredient(id, data),
    onSuccess: (updated) => {
      qc.setQueryData<IngredientDB[]>(
        ["ingredients"],
        (old = []) => old.map(i => (i.id === updated.id ? updated : i))
      );
    },
    onError: (err) => {
      console.error("Update failed", err);
    },
  });
}


export function useDeleteIngredient() {
  const qc = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteIngredient(id),
    onSuccess: (_void, id) => {
      qc.setQueryData<IngredientDB[]>(
        ["ingredients"],
        (old = []) => old.filter(i => i.id !== id)
      );
    },
    onError: (err) => {
      console.error("Delete failed", err);
    },
  });
}