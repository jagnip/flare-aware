"use client";

import { useState } from "react";
import pluralize from "pluralize";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { IngredientDB } from "@/types";

type IngredientSelectProps = {
  selectedIngredient: IngredientDB | null;
  onChange: (ingredient: IngredientDB) => void;
  options: IngredientDB[];
  fallbackName: string;
};

export const IngredientSelect = ({
  selectedIngredient,
  fallbackName,
  onChange,
  options,
}: IngredientSelectProps) => {
  const [isOpen, setOpen] = useState(false);

  const displayName = selectedIngredient?.name || fallbackName || "Choose";

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          className="ml-1 cursor-pointer rounded bg-muted px-1 py-0.5
                     hover:bg-muted-foreground/10"
          onClick={() => setOpen(true)}
        >
          {displayName}
        </span>
      </PopoverTrigger>

      <PopoverContent className="w-[180px] p-0 max-h-48 overflow-y-auto">
        <Command>
          <CommandInput placeholder="Search ingredient..." />
          <CommandEmpty>No ingredient found.</CommandEmpty>

          <CommandGroup>
      
            {options.map((ing) => (
              <CommandItem
                key={ing.id}
                value={ing.id}
                onSelect={() => {
                  onChange(ing);
                  setOpen(false);
                }}
              >
                {ing.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
