"use client";
import { FullRecipe } from "@/types";
import { useRouter } from "next/router";
import { Form, useForm } from "react-hook-form";

const recipeDefaultValues = {
  name: "",
  // etc.
};

const RecipeForm = ({
  type,
  recipe,
  recipeId,
}: {
  type: "Create" | "Update";
  recipe?: FullRecipe;
  recipeId?: string;
}) => {
  //   const router = useRouter();
  const form = useForm({
    // here zod validation schema
    defaultValues: recipe && type === "Update" ? recipe : recipeDefaultValues,
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
