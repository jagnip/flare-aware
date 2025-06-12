import { useState } from "react";
import { IngredientDB, IngredientOption } from "@/types";
import {
  INGREDIENT_UNITS_SELECT,
  UNCOUNTABLE_UNITS,
} from "@/lib/constants";
import { getDisplayString } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IngredientSelect } from "./ingredient-select";
import { UnitSelect } from "./unit-select";
import { INGREDIENTS_MAP } from "@/app/db/ingredients";

 type ParsedIngredient = {
  ingredient: IngredientOption;
  amount: string;
  unit: string;
  extraInfo?: string;
  rawIngredient: string;
};

const IngredientCard = ({ ingredient }: { ingredient: ParsedIngredient }) => {
  const [selectedUnit, setSelectedUnit] = useState(ingredient.unit);
  const [selectedIngredient, setSelectedIngredient] = useState(ingredient.ingredient);

  return (
    <Card className="mb-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <img
            src={selectedIngredient.iconUrl}
            alt="Ingredient"
            className="h-6 w-6 rounded-sm"
          />
          <CardTitle className="flex justify-between items-center w-full">
            <div>
              {/* <IngredientSelect
                selectedIngredient={selectedIngredient}
                amount={ingredient.amount}
                onChange={setSelectedIngredient}
                options={INGREDIENTS_MAP}
              /> */}
            </div>
            <div>
              <span className="ml-1 cursor-pointer bg-muted px-1 py-0.5 rounded hover:bg-muted-foreground/10">
                {ingredient.amount}
              </span>
              <UnitSelect
                selectedUnit={selectedUnit}
                amount={ingredient.amount}
                onChange={setSelectedUnit}
                options={INGREDIENT_UNITS_SELECT}
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