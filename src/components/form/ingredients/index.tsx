"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { parseIngredients } from "./parsing";
import IngredientCard from "./card";
import { useCreateIngredient, useIngredients } from "@/hooks/useIngredients";

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

  console.log(ingredients)

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
  );
};

export default AddIngredientsInput;
