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
import { INGREDIENT_UNITS_SELECT, UNCOUNTABLE_UNITS } from "@/lib/constants";
import { getDisplayUnit } from "@/lib/utils";
import { IngredientCardSelectTrigger } from "./select-trigger";

type IngredientCardSelectProps = {
  selectedOption: string;
  amount: string;
  onChange: (unit: string) => void;
};

export const IngredientCardSelect = ({
  selectedOption,
  amount,
  onChange,
}: IngredientCardSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <span
          className="ml-1 cursor-pointer bg-muted px-1 py-0.5 rounded hover:bg-muted-foreground/10"
          onClick={() => setIsOpen(true)}
        >
          {getDisplayUnit(selectedOption, amount)}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-[120px] p-0 max-h-48 overflow-y-auto">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>No unit found.</CommandEmpty>
          <CommandGroup>
            {INGREDIENT_UNITS_SELECT.map((unit) => {
              const label =
                Number(amount) > 1 && !UNCOUNTABLE_UNITS.has(unit)
                  ? pluralize(unit)
                  : unit;

              return (
                <CommandItem
                  key={unit}
                  value={unit}
                  onSelect={(value) => {
                    onChange(value);
                    setIsOpen(false);
                  }}
                >
                  {label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
