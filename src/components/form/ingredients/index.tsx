"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { parseIngredients } from "../../../lib/ingredients/parsing";
import IngredientCard from "./card";
import { useCreateIngredient, useIngredients } from "@/hooks/useIngredients";
import { IngredientActionsProvider } from "@/context/IngredientActionsContext";

const AddIngredientsInput = ({}) => {
  const [rawIngredients, setRawIngredients] = useState("");
  const { trigger, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const { data: ingredients = [], isLoading, error } = useIngredients();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Couldn't load ingredients</div>;

  const handleClick = async () => {
    const parsedIngredients = await parseIngredients(rawIngredients);

    parsedIngredients.forEach((ing) => {
      append({
        ingredientId: ing.ingredient?.id ?? null,
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        extraInfo: ing.extraInfo ?? "",
      });
    });

    setRawIngredients("");
    await trigger("ingredients");
  };

  return (
    <IngredientActionsProvider>
      <div>
        {fields.map((field, index) => (
          <IngredientCard
            key={field.id}
            allIngredients={ingredients}
            onRemove={() => {
              remove(index);
            }}
            index={index}
          />
        ))}
        <Textarea
          value={rawIngredients}
          onChange={(e) => setRawIngredients(e.target.value)}
          placeholder="Enter ingredients"
        />
        <Button onClick={handleClick} type="button">
          Add ingredients
        </Button>
      </div>
    </IngredientActionsProvider>
  );
};

export default AddIngredientsInput;
