"use client";

import { useState } from "react";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/extension/multi-select";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CollectionDB } from "@/types";

type MultiSelectProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder?: string;
  collections: CollectionDB[];
};

export const MultiSelectField = <T extends FieldValues>({
  form,
  name,
  placeholder,
  collections,
}: MultiSelectProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="max-w-xs">
          <FormLabel>{name}</FormLabel>
          <FormControl>
            <MultiSelector
              values={field.value ?? []}
              onValuesChange={field.onChange}
              loop
              className="max-w-xs"
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput
                  placeholder={placeholder ?? "Select options"}
                />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {collections.map((collection) => (
                    <MultiSelectorItem
                      value={collection.name}
                      key={collection.id}
                    >
                      {collection.name}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
