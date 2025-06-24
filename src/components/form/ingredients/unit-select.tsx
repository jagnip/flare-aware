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
import { UNCOUNTABLE_UNITS } from "@/lib/constants";
import { getDisplayString } from "@/lib/utils";

type UnitSelectProps = {
  field: {
    value: string;
    onChange: (unit: string) => void;
  };
  amount: string;
  options: string[];
};

export const UnitSelect = ({ field, options, amount }: UnitSelectProps) => {
  const { value: selectedUnit, onChange } = field;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <span
          className="ml-1 cursor-pointer bg-muted px-1 py-0.5 rounded hover:bg-muted-foreground/10"
          onClick={() => setIsOpen(true)}
        >
          {getDisplayString(selectedUnit, amount)}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-[120px] p-0 max-h-48 overflow-y-auto">
        <Command>
          <CommandInput placeholder="Search unit..." />
          <CommandEmpty>No unit found.</CommandEmpty>
          <CommandGroup>
            {options.map((unit) => {
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
