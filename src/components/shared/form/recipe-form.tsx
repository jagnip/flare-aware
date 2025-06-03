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
import { toast } from "sonner";
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
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function RecipeForm() {
  const form = useForm<recipeFormType>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  function onSubmit(values: z.infer<typeof recipeSchema>) {
    console.log(values);
  }

  const images = form.watch("images");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TextInputField
          form={form}
          name="name"
          placeholder="Enter recipe name"
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Images</FormLabel>
              <FormControl>
                <UploadDropzone
                  endpoint="imageUploader"
                  appearance={{
                    button: {
                      color: "#000",
                    },
                    container: {
                      display: "flex",
                    },
                  }}
                  onClientUploadComplete={(res: { url: string }[]) => {
                    const uploadedUrls = res.map((file) => file.url);
                    form.setValue("images", [...images, ...uploadedUrls]);
                  }}
                  onUploadError={(error: Error) => {
                    toast(`${error.message}`);
                  }}
                />
              </FormControl>
              <FormMessage />
              <div className="mt-4 flex gap-2 flex-wrap">
                {images.map((image: string) => (
                  <Image
                    key={image}
                    src={image}
                    alt="product image"
                    className="w-20 h-20 object-cover object-center rounded-sm"
                    width={100}
                    height={100}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />
        <FormField
          name="handsOnTime"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter prep time in minutes"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="handsOffTime"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter cooking time in minutes"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your instructions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Ingredients</FormLabel>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4">
              {/* Name */}
              <FormField
                control={form.control}
                name={`ingredients.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Flour" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quantity */}
              <FormField
                control={form.control}
                name={`ingredients.${index}.quantity`}
                render={({ field }) => (
                  <FormItem className="w-28">
                    <FormLabel>Qty</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 200"
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? "" : Number(val));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Unit */}
              <FormField
                control={form.control}
                name={`ingredients.${index}.unit`}
                render={({ field }) => (
                  <FormItem className="w-32">
                    <FormLabel>Unit</FormLabel>
                    <Select
                      value={field.value || ""}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
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

              {/* Remove Button */}
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
              >
                ✕
              </Button>
            </div>
          ))}

          {/* Add new ingredient button */}
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ name: "", quantity: undefined, unit: "" })}
          >
            + Add Ingredient
          </Button>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          {/* Source Name */}
          <FormField
            control={form.control}
            name="source.name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Source Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Grandma’s Cookbook" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Source URL */}
          <FormField
            control={form.control}
            name="source.url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Source URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
