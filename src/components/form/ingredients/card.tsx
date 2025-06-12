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
import { IngredientCardSelect } from "./combobox";

const IngredientCard = ({ ingredient }: { ingredient: IngredientDB }) => {
  const [isEditingUnit, setIsEditingUnit] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(ingredient.unit);

  function onUnitChange(unit: string) {
    setSelectedUnit(unit);
    setIsEditingUnit(false);
  }

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
              <IngredientCardSelect
                onChange={onUnitChange}
                amount={ingredient.amount}
                selectedOption={selectedUnit}
              />
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
