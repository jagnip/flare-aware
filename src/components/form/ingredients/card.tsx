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
import { useController, useFormContext } from "react-hook-form";

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
  index,
  onRemove,
}: {
  ingredient: UserIngredientDB;
  allIngredients: IngredientDB[];
  onRemove: () => void;
  index: number;
}) => {
  // const [unit, setUnit] = useState(ingredient.unit);
  // const [ingredientDB, setIngredientDB] = useState(ingredient.ingredient);
  // const [name, setName] = useState(ingredient.name);
  // const [amount, setAmount] = useState(ingredient.amount);
  // const [extraInfo, setExtraInfo] = useState(ingredient.extraInfo ?? "");
  // const [icon, setIcon] = useState(ingredient.ingredient?.iconFile || "❔");
  const [isHovered, setIsHovered] = useState(false);
  const { control } = useFormContext();

  const { field: ingredientId } = useController({
    name: `ingredients.${index}.ingredientId`,
    control,
  });
  const { field: name } = useController({
    name: `ingredients.${index}.name`,
    control,
  });
  const { field: amount } = useController({
    name: `ingredients.${index}.amount`,
    control,
  });
  const { field: unit } = useController({
    name: `ingredients.${index}.unit`,
    control,
  });
  const { field: extraInfo } = useController({
    name: `ingredients.${index}.extraInfo`,
    control,
  });

  const recognised = !!ingredientId.value;

  const dbIngredient = recognised
    ? allIngredients.find((i) => i.id === ingredientId.value) ?? null
    : null;

  const displayIconFile = recognised ? dbIngredient?.iconFile : "❔";

  function handleNewIngredientSave(newName: string, newId: string) {
    name.onChange(newName);
    ingredientId.onChange(newId);
  }

  return (
    <Card
      className={!recognised ? "bg-yellow-100 border-yellow-300 mb-2" : "mb-2"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          {recognised ? (
            <img
              src={`/ingredients/${displayIconFile}`}
              alt={name.value}
              className="h-6 w-6"
            />
          ) : (
            <span className="text-xl">❔</span>
          )}
          <CardTitle className="flex justify-between items-center w-full">
            <div>
              <IngredientSelect
                selectedIngredient={dbIngredient}
                fallbackName={name.value}
                options={allIngredients}
                onChange={(ing) => {
                  ingredientId.onChange(ing ? ing.id : null);
                  name.onChange(ing ? ing.name : name.value);
                }}
              />
            </div>
            {!recognised && (
              <NewIngredientDialog
                ingredients={allIngredients}
                name={name.value}
                onSave={handleNewIngredientSave}
              />
            )}

            <div>
              <AmountInput field={amount} />
              <UnitSelect
                field={unit}
                amount={amount.value}
                options={INGREDIENT_UNITS_SELECT}
              />
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <ExtraInfoInput field={extraInfo} />
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
