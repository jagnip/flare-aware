"use client";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";

type NumberInputFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder?: string;
};

const NumberInputField = <T extends FieldValues>({
  form,
  name,
  placeholder,
}: NumberInputFieldProps<T>) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{field.name}</FormLabel>
          <FormControl>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                onClick={() => field.onChange((Number(field.value) || 0) - 5)}
              >
                –
              </Button>
              <Input placeholder={placeholder} {...field} type="number" />
              <Button
                type="button"
                onClick={() => field.onChange((Number(field.value) || 0) + 5)}
              >
                +
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NumberInputField;
