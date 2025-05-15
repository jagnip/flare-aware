"use client";
import { createRecipeSchema, updateRecipeSchema } from "@/lib/validator";
import { FullRecipe } from "@/types";
import { useRouter } from "next/router";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateRecipeInput, UpdateRecipeInput } from "@/lib/validator";
import { RECIPE_DEFAULT_VALUES } from "@/lib/constants";

const RecipeForm = ({ recipe }: { recipe?: FullRecipe }) => {
  if (recipe) {
    const {
      name,
      images,
      servings,
      handsOnTime,
      handsOffTime,
      instructions,
      notes,
      source,
      ingredients,
      variants,
      collections,
    } = recipe;
    const defaultValues = {
      name,
      images,
      servings,
      handsOnTime,
      handsOffTime,
      instructions,
      notes,
      source: source ? { name: source.name, url: source.url } : null,
      ingredients,
      variants,
      collections,
    };
  }

  const form = useForm<CreateRecipeInput>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: recipe ? {} : RECIPE_DEFAULT_VALUES,
  });

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Images Column */}
        <div className="col-span-2">
          <div className="flex flex-col">Images, Collections, Ingredients</div>
        </div>

        {/* Details Column */}
        <div className="col-span-3">
          <div className="flex flex-col">
            Servings, times, source, instructions, notes
          </div>
        </div>
      </div>
    </Form>
  );
};

export default RecipeForm;
