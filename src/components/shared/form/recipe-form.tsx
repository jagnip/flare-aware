"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeFormInput, recipeSchema } from "@/lib/validator";
import TextInputField from "./text-input-field";
import ImageUpload from "./image-upload";
import NumberInputField from "./number-input-field";
import TextArea from "./text-area";
import { MultiSelectField } from "./multi-select";
import { useEffect, useState } from "react";
import { getCollections } from "@/lib/actions/collection.actions";
import { CollectionDB } from "@/types";
import {
  parseIngredient,
  parseInstruction,
} from "@jlucaspains/sharp-recipe-parser";
import { createRecipe } from "@/lib/actions/recipe.actions";
import { normalizeRecipeFormInput } from "@/lib/actions/utils";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export function RecipeForm() {
  const [collections, setCollections] = useState<CollectionDB[]>([]);
  const router = useRouter();

  const form = useForm<RecipeFormInput>({
    resolver: zodResolver(recipeSchema),
    mode: "onBlur",
    defaultValues: {
      name: "test",
      images: [],
      handsOnTime: 5,
      handsOffTime: 0,
      instructions: "test",
      ingredients: "",
      source: "",
      collections: [],
      servings: 1,
      notes: "",
    },
  });

  useEffect(() => {
    async function fetchCollections() {
      const data = await getCollections();
      setCollections(data);
    }
    fetchCollections();
  }, []);

  async function onSubmit(
    values: z.infer<typeof recipeSchema>,
    collections: CollectionDB[]
  ) {
    const normalisedValues = normalizeRecipeFormInput(values, collections);
    await createRecipe(normalisedValues);
    router.push(`${ROUTES.RECIPES}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values, collections))}
        className="space-y-8"
      >
        <TextInputField
          form={form}
          name="name"
          placeholder="Enter recipe name"
        />
        <ImageUpload form={form} name="images" />
        <NumberInputField
          form={form}
          name="handsOnTime"
          placeholder="Enter prep time in minutes"
          stepper={5}
        />
        <NumberInputField
          form={form}
          name="handsOffTime"
          placeholder="Enter cooking time in minutes"
          stepper={5}
        />
        <NumberInputField
          form={form}
          name="servings"
          placeholder="Enter servings"
        />
        <TextArea
          form={form}
          name="instructions"
          placeholder="Enter instructions"
        />

        <TextArea form={form} name="notes" placeholder="Enter notes" />

        <TextArea
          form={form}
          name="ingredients"
          placeholder="Enter ingredients"
        />

        <TextInputField
          form={form}
          name="source"
          placeholder="Enter source name"
        />

        <MultiSelectField
          form={form}
          name="collections"
          placeholder="Select collections"
          collections={collections}
        />

        <Button>Save</Button>
      </form>
    </Form>
  );
}

export default RecipeForm;
