"use client";

import { useState } from "react";
import { IngredientDB } from "@/types";
import {
  INGREDIENT_UNITS,
  INGREDIENT_UNITS_SELECT,
  UNCOUNTABLE_UNITS,
} from "@/lib/constants";
import { cn, getDisplayUnit } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import pluralize from "pluralize";

const IngredientCard = ({ ingredient }: { ingredient: IngredientDB }) => {
  const [isEditingUnit, setIsEditingUnit] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(ingredient.unit);

  return (
    <Card className="mb-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Ingredient"
            className="h-6 w-6 rounded-sm"
          />
          <CardTitle className="flex justify-between items-center w-full">
            {ingredient.ingredient?.name ?? "Unknown ingredient"}
            <div>
              <span className="ml-1 cursor-pointer bg-muted px-1 py-0.5 rounded hover:bg-muted-foreground/10">
                {ingredient.amount}{" "}
              </span>
              <Popover open={isEditingUnit} onOpenChange={setIsEditingUnit}>
                <PopoverTrigger asChild>
                  <span className="ml-1 cursor-pointer bg-muted px-1 py-0.5 rounded hover:bg-muted-foreground/10">
                    {getDisplayUnit(selectedUnit, ingredient.amount)}
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-[120px] p-0 max-h-48 overflow-y-auto">
                  <Command>
                    <CommandInput placeholder="Search" />
                    <CommandEmpty>No unit found.</CommandEmpty>
                    <CommandGroup>
                      {INGREDIENT_UNITS_SELECT.map((unit) => {
                        const label =
                          Number(ingredient.amount) > 1 &&
                          !UNCOUNTABLE_UNITS.has(unit)
                            ? pluralize(unit)
                            : unit;

                        return (
                          <CommandItem
                            key={unit}
                            value={unit}
                            onSelect={(value) => {
                              setSelectedUnit(value);
                              setIsEditingUnit(false);
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
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      {ingredient.extraInfo && (
        <CardContent className="text-sm text-muted-foreground">
          {ingredient.extraInfo}
        </CardContent>
      )}
    </Card>
  );
};

export default IngredientCard;
