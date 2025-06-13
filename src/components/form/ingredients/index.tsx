"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import TextArea from "../text-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IngredientDB } from "@/types";
import { parse } from "path";
import { parseIngredients } from "./parsing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IngredientCard from "./card";

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
  const [parsedIngredients, setParsedIngredients] = useState<IngredientDB[]>(
    []
  );

  const handleClick = () => {
    const rawIngredients = form.watch(name);
    const parsedIngredients = parseIngredients(rawIngredients);
    setParsedIngredients((currentIngredients) => [
      ...currentIngredients,
      ...parsedIngredients,
    ]);
  };

  return (
    <div>
      {parsedIngredients.map((ingredient, index) => (
       <IngredientCard
          key={index}
          ingredient={ingredient}
       
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
