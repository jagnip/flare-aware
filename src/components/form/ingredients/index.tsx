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
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
  
    if (over?.id === "trash-zone") {
      const draggedId = active.id;
  
      setParsedIngredients((prev) =>
        prev.filter((ingredient) => ingredient.rawIngredient !== draggedId)
      );
    }
  };

  const { setNodeRef, isOver } = useDroppable({
    id: "trash-zone",
  });

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        <div
          ref={setNodeRef}
          className={`mt-4 h-[400px] border-2 border-dashed rounded p-4 text-center text-sm transition-colors ${
            isOver
              ? "bg-red-100 border-red-400 text-red-600"
              : "border-gray-300 text-gray-500"
          }`}
        >
          Drop here to remove ingredient
        </div>
        {parsedIngredients.map((ingredient, index) => (
          <IngredientCard key={index} ingredient={ingredient} />
        ))}
        <TextArea form={form} name={name} placeholder={placeholder} />
        <Button onClick={handleClick} type="button">
          Add ingredients
        </Button>
      </div>
    </DndContext>
  );
};

export default AddIngredientsInput;
