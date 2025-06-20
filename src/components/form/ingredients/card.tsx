import { useEffect, useRef, useState } from "react";
import { UserIngredientDB, IngredientDB } from "@/types";
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

type UserIngredient = {
  ingredient: IngredientDB;
  name: string;
  amount: string;
  unit: string;
  extraInfo?: string;
  rawIngredient: string;
};

const IngredientCard = ({
  ingredient,
  allIngredients,
  onRemove,
}: {
  ingredient: UserIngredientDB;
  allIngredients: IngredientDB[];
  onRemove: () => void;
}) => {
  const [unit, setUnit] = useState(ingredient.unit);
  const [ingredientDB, setIngredientDB] = useState(ingredient.ingredient);
  const [name, setName] = useState(ingredient.name);
  const [amount, setAmount] = useState(ingredient.amount);
  const [extraInfo, setExtraInfo] = useState(ingredient.extraInfo ?? "");
  const [icon, setIcon] = useState(ingredient.ingredient?.iconFile || "❔");
  const [isHovered, setIsHovered] = useState(false);

  const handleNewIngredientSave = (newName: string, newIcon: string) => {
    setName(newName);
    setIcon(newIcon);
    console.log("New ingredient saved:", newName, newIcon);
  };

  return (
    <Card
      className={`mb-2 ${
        !ingredientDB ? "bg-yellow-100 border-yellow-300" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          {ingredientDB ? (
            <img
              src={`/ingredients/${ingredientDB.iconFile}`}
              alt={name}
              className="h-6 w-6"
            />
          ) : (
            <span className="h-6 w-6 text-xl">{icon}</span>
          )}
          <CardTitle className="flex justify-between items-center w-full">
            <div>
              <IngredientSelect
                name={name}
                selectedIngredient={ingredientDB}
                amount={amount}
                onChange={setIngredientDB}
                options={allIngredients}
              />
            </div>
            {!ingredient.ingredient && (
              <NewIngredientDialog
              ingredients={allIngredients}
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
        {isHovered && (
          <Button type="button" onClick={onRemove}>
            X
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default IngredientCard;
