"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ReactNode } from "react";
import {
  FieldValues,
  UseFormReturn,
  ControllerRenderProps,
  Path,
} from "react-hook-form";

type RecipeFormFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  children: (field: ControllerRenderProps<T, any>) => ReactNode;
};

const CustomFormField = <T extends FieldValues>({
  form,
  name,
  children,
}: RecipeFormFieldProps<T>) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{field.name}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
