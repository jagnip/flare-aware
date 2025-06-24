"use client";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { IngredientDB, UserIngredientDB } from "@/types";
import { parse } from "path";
import { parseIngredients } from "./parsing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IngredientCard from "./card";
import { prisma } from "@/app/db/prisma";
import { getIngredients } from "@/lib/actions/ingredient.actions";
import { API_ROUTES } from "@/lib/constants";
import { set } from "zod";

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
  // const [parsedIngredients, setParsedIngredients] = useState<
  //   UserIngredientDB[]
  // >([]);
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
    // console.log("Parsed ingredients:", parsedIngredients);
    // setParsedIngredients((currentIngredients) => [
    //   ...currentIngredients,
    //   ...parsedIngredients,
    // ]);
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
    console.log(fields)
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
