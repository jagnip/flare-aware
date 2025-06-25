"use client";
import {
  FieldValues,
  UseFormReturn,
  Path,
  useFormContext,
  useFieldArray,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { IngredientDB, UserIngredientDB } from "@/types";
import { parseIngredients } from "./parsing";
import IngredientCard from "./card";
import { API_ROUTES } from "@/lib/constants";

const AddIngredientsInput = ({}) => {
  const [ingredients, setIngredients] = useState<IngredientDB[]>([]);
  const [rawIngredients, setRawIngredients] = useState("");
  const { trigger, formState, watch, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const res = await fetch(API_ROUTES.INGREDIENTS);
        const data = await res.json();
        setIngredients(data);
      } catch (err) {
        console.error("Failed to fetch ingredients:", err);
      }
    }

    fetchIngredients();
  }, []);

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
