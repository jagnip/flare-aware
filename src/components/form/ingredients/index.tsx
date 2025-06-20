"use client";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import TextArea from "../text-area";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IngredientDB, UserIngredientDB } from "@/types";
import { parse } from "path";
import { parseIngredients } from "./parsing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IngredientCard from "./card";
import { prisma } from "@/app/db/prisma";
import { getIngredients } from "@/lib/actions/ingredient.actions";
import { API_ROUTES } from "@/lib/constants";

type AddIngredientsInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder?: string;
};

const AddIngredientsInput = <T extends FieldValues>({
  form,
  name,
  placeholder,
}: AddIngredientsInputProps<T>) => {
  const [parsedIngredients, setParsedIngredients] = useState<
    UserIngredientDB[]
  >([]);
  const [ingredients, setIngredients] = useState<IngredientDB[]>([]);

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
    const rawIngredients = form.watch(name);
    const parsedIngredients = await parseIngredients(rawIngredients);
    setParsedIngredients((currentIngredients) => [
      ...currentIngredients,
      ...parsedIngredients,
    ]);
  };

  return (
    <div>
      {parsedIngredients.map((ingredient, index) => (
        <IngredientCard
          key={ingredient.rawIngredient}
          ingredient={ingredient}
          allIngredients={ingredients}
          onRemove={() => {
            setParsedIngredients((currentIngredients) =>
              currentIngredients.filter(
                (ing) => ing.rawIngredient !== ingredient.rawIngredient
              )
            );
          }}
        />
      ))}
      <TextArea form={form} name={name} placeholder={placeholder} />
      <Button onClick={handleClick} type="button">
        Add ingredients
      </Button>
    </div>
  );
};

export default AddIngredientsInput;
