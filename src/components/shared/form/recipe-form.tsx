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
import { Collection } from "@/types";
import { createRecipe } from "@/lib/actions/recipe.actions";

export function RecipeForm() {
  const [collections, setCollections] = useState<Collection[]>([]);

  const form = useForm<RecipeFormInput>({
    resolver: zodResolver(recipeSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      images: [],
      handsOnTime: 0,
      handsOffTime: 0,
      instructions: "",
      ingredients: "",
      source: "",
      collections: [],
      servings: 1,
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof recipeSchema>) {
    const parsed = recipeSchema.parse(values);
    const collectionIds = parsed.collections.map((name) => {
      const match = collections.find((c) => c.name === name);
      if (!match) {
        throw new Error(`Collection with name "${name}" not found`);
      }
      return { id: match.id };
    });

    const parsedWithIds = {
      ...parsed,
      collections: collectionIds,
    };

    console.log(parsedWithIds);
    console.log(collectionIds);

    //contunue normalisation 
  }

  useEffect(() => {
    async function fetchCollections() {
      const data = await getCollections();
      setCollections(data);
    }
    fetchCollections();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
