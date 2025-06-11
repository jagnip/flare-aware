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
  stepper?: number;
};

const NumberInputField = <T extends FieldValues>({
  form,
  name,
  placeholder,
  stepper = 1,
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
                onClick={() => field.onChange((Number(field.value) || 0) - stepper)}
              >
                –
              </Button>
              <Input placeholder={placeholder} {...field} type="number" />
              <Button
                type="button"
                onClick={() => field.onChange((Number(field.value) || 0) + stepper)}
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
