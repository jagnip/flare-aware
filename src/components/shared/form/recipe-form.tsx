"use client";
import { Recipe } from "@/types";
import { useRouter } from "next/router";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {  recipeSchema, type recipeForm} from "@/lib/validator";
import { RECIPE_DEFAULT_VALUES } from "@/lib/constants";

const RecipeForm = () => {

  const form = useForm<z.input<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema)
  });

    return (
      <Form {...form}>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">
            <div className="flex flex-col">
              Images, Collections, Ingredients
            </div>
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
  }

export default RecipeForm;
