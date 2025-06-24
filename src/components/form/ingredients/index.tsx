"use client";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { IngredientDB } from "@/types";
import { parseIngredients } from "./parsing";
import IngredientCard from "./card";
import { API_ROUTES } from "@/lib/constants";


type AddIngredientsInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  append: (value: any) => void;
  fields: any[];
  remove: (index: number) => void;
};

const AddIngredientsInput = <T extends FieldValues>({
  form,
  name,
  append,
  remove,
  fields,
}: AddIngredientsInputProps<T>) => {
  const [ingredients, setIngredients] = useState<IngredientDB[]>([]);
  const [rawIngredients, setRawIngredients] = useState("");

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
    console.log(parsedIngredients);
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

  };

  return (
    <div>
      {fields.map((field, index) => (
        <IngredientCard
          key={field.id}
          ingredient={field}
          allIngredients={ingredients}
          onRemove={() => {
            remove(field.id);
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
