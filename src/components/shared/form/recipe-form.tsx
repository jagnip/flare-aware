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
import { recipeSchema } from "@/lib/validator";
import { RECIPE_DEFAULT_VALUES } from "@/lib/constants";

export function RecipeForm() {
  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
    defaultValues: RECIPE_DEFAULT_VALUES,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  function onSubmit(values: z.infer<typeof recipeSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                <Input placeholder="Enter recipe name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const imageUrls = files.map((file) =>
                      URL.createObjectURL(file)
                    );
                    field.onChange(imageUrls);
                  }}
                />
              </FormControl>
              <FormMessage />
              {/* Preview */}
              <div className="mt-4 flex gap-2 flex-wrap">
                {(field.value || []).map((src: string, i: number) => (
                  <img
                    key={i}
                    src={src}
                    alt={`preview-${i}`}
                    className="h-24 w-24 object-cover rounded border"
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
