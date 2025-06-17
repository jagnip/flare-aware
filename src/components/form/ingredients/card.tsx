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
import ExtraInfoInput from "./extra-info-input";
import { Button } from "@/components/ui/button";
import { NewIngredientDialog } from "./new-ingredient-dialog";

type ParsedIngredient = {
  ingredient: IngredientDummyDB;
  name: string;
  amount: string;
  unit: string;
  extraInfo?: string;
  rawIngredient: string;
};

const IngredientCard = ({ ingredient }: { ingredient: ParsedIngredient }) => {
  const [unit, setUnit] = useState(ingredient.unit);
  const [ingredientDB, setIngredientDB] = useState(ingredient.ingredient);
  const [name, setName] = useState(ingredient.name);
  const [amount, setAmount] = useState(ingredient.amount);
  const [extraInfo, setExtraInfo] = useState(ingredient.extraInfo ?? "");
  const [icon, setIcon] = useState(ingredient.ingredient?.iconUrl || "❔");
  const handleNewIngredientSave = (newName: string, newIcon: string) => {
    setName(newName);
    setIcon(newIcon);
  };

  console.log("IngredientCard rendered", {
    ingredient,
    ingredientDB,  
    name,
    amount,
    unit,
    extraInfo,
    icon,
  });


  return (
    <Card className="mb-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 text-xl">{icon}</span>
          <CardTitle className="flex justify-between items-center w-full">
            <div>
              <IngredientSelect
                name={name}
                selectedIngredient={ingredientDB}
                amount={amount}
                onChange={setIngredientDB}
                options={INGREDIENTS_MAP}
              />
            </div>
            {!ingredient.ingredient && (
              <NewIngredientDialog
                name={name}
                onSave={handleNewIngredientSave}
              />
            )}

            <div>
              <AmountInput selectedAmount={amount} onChange={setAmount} />
              <UnitSelect
                selectedUnit={unit}
                amount={amount}
                onChange={setUnit}
                options={INGREDIENT_UNITS_SELECT}
              />
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <ExtraInfoInput onChange={setExtraInfo} extraInfo={extraInfo} />
      </CardContent>
    </Card>
  );
};

export default IngredientCard;
