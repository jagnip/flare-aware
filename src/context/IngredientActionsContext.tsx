"use client";

import React, { createContext, useContext, useMemo } from "react";
import {
  useCreateIngredient,
  useUpdateIngredient,
  useDeleteIngredient,
} from "@/hooks/useIngredients";
import { IngredientDB } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { IngredientFormInput } from "@/lib/validator";

type IngredientActions = {
  create: (input: IngredientFormInput) => Promise<IngredientDB>;
  update: (id: number, input: IngredientFormInput) => Promise<IngredientDB>;
  remove: (id: number) => Promise<void>;
};

const IngredientActionsContext = createContext<IngredientActions | null>(null);

export function IngredientActionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const createMutation = useCreateIngredient();
  const updateMutation = useUpdateIngredient();
  const deleteMutation = useDeleteIngredient();

  const actions = useMemo<IngredientActions>(
    () => ({
      create: (input) =>
        new Promise<IngredientDB>((resolve, reject) =>
          createMutation.mutate(input, {
            onSuccess: (newIng) => {
              queryClient.invalidateQueries({ queryKey: ["ingredients"] });
              resolve(newIng);
            },
            onError: reject,
          })
        ),

      update: (id, input) =>
        new Promise<IngredientDB>((resolve, reject) =>
          updateMutation.mutate(
            { id, data: input },
            {
              onSuccess: (updated) => {
                queryClient.invalidateQueries({ queryKey: ["ingredients"] });
                resolve(updated);
              },
              onError: reject,
            }
          )
        ),

      remove: (id) =>
        new Promise<void>((resolve, reject) =>
          deleteMutation.mutate(id, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["ingredients"] });
              resolve();
            },
            onError: reject,
          })
        ),
    }),
    [
      createMutation,
      updateMutation,
      deleteMutation,
      queryClient,
    ]
  );

  return (
    <IngredientActionsContext.Provider value={actions}>
      {children}
    </IngredientActionsContext.Provider>
  );
}

export function useIngredientActions(): IngredientActions {
  const ctx = useContext(IngredientActionsContext);
  if (!ctx) {
    throw new Error(
      "useIngredientActions must be used inside <IngredientActionsProvider>"
    );
  }
  return ctx;
}