"use client";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INGREDIENT_UNITS } from "@/lib/constants";
import { recipeFormType, recipeSchema } from "@/lib/validator";
import TextInputField from "./text-input-field";
import ImageUpload from "./image-upload";
import NumberInputField from "./number-input-field";
import TextArea from "./text-area";

export function RecipeForm() {
  const form = useForm<recipeFormType>({
    resolver: zodResolver(recipeSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      images: [],
      handsOnTime: 0,
      handsOffTime: 0,
      instructions: "",
    },
  });

  function onSubmit(values: z.infer<typeof recipeSchema>) {
    console.log(values);
  }

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
        />
        <NumberInputField
          form={form}
          name="handsOffTime"
          placeholder="Enter cooking time in minutes"
        />
        <TextArea
          form={form}
          name="instructions"
          placeholder="Enter recipe name"
        />

        <TextArea
          form={form}
          name="ingredients"
          placeholder="Enter ingredients"
        />

        <div className="flex flex-col gap-5 md:flex-row">
          <TextInputField
            form={form}
            name="source.name"
            placeholder="Enter source name"
          />

          <TextInputField
            form={form}
            name="source.url"
            placeholder="Enter source URL"
          />
        </div>

        <FormField
          control={form.control}
          name="collections"
          render={({ field }) => (
            <FormItem className="w-32">
              <FormLabel>Collections</FormLabel>
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select collections" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INGREDIENT_UNITS.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button>Save</Button>
      </form>
    </Form>
  );
}

export default RecipeForm;
