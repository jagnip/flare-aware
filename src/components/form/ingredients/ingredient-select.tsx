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
  amount: string;
  name: string;
};



export const IngredientSelect = ({
  // selectedIngredient,
  name,
  onChange,
  options,
}: IngredientSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <span
          className="ml-1 cursor-pointer bg-muted px-1 py-0.5 rounded hover:bg-muted-foreground/10"
          onClick={() => setIsOpen(true)}
        >
          {name}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-[160px] p-0 max-h-48 overflow-y-auto">
        <Command>
          <CommandInput placeholder="Search ingredient..." />
          <CommandEmpty>No ingredient found.</CommandEmpty>
          <CommandGroup>
            {Object.entries(options).map(([key, ingredient]) => (
              <CommandItem
                key={key}
                value={key}
                onSelect={() => {
                  onChange(ingredient);
                  setIsOpen(false);
                }}
              >
                {ingredient.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
