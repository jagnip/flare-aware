import { useEffect, useRef, useState } from "react";
import { IngredientDB, IngredientDummyDB } from "@/types";
import { INGREDIENT_UNITS_SELECT, UNCOUNTABLE_UNITS } from "@/lib/constants";
import { getDisplayString } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IngredientSelect } from "./ingredient-select";
import { UnitSelect } from "./unit-select";
import { INGREDIENTS_MAP } from "@/app/db/ingredients";
import { Input } from "@/components/ui/input";
import AmountInput from "./amount-input";

type ParsedIngredient = {
  ingredient: IngredientDummyDB;
  amount: string;
  unit: string;
  extraInfo?: string;
  rawIngredient: string;
};

const IngredientCard = ({ ingredient }: { ingredient: ParsedIngredient }) => {
  const [selectedUnit, setSelectedUnit] = useState(ingredient.unit);
  const [selectedIngredient, setSelectedIngredient] = useState(
    ingredient.ingredient
  );
  const [selectedAmount, setSelectedAmount] = useState(ingredient.amount);

  return (
    <Card className="mb-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <img src="" alt="Ingredient" className="h-6 w-6 rounded-sm" />
          <CardTitle className="flex justify-between items-center w-full">
            <div>
              <IngredientSelect
                selectedIngredient={selectedIngredient}
                amount={ingredient.amount}
                onChange={setSelectedIngredient}
                options={INGREDIENTS_MAP}
              />
            </div>
            <div>
              <AmountInput
                selectedAmount={selectedAmount}
                onChange={setSelectedAmount}
              />
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
