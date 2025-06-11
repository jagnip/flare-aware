"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import TextArea from "../text-area";

type TextAreaProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder?: string;
};

const AddIngredientsInput = <T extends FieldValues>({
  form,
  name,
  placeholder,
}: TextAreaProps<T>) => {
  return <TextArea form={form} name={name} placeholder={placeholder} />;
};

export default AddIngredientsInput;
