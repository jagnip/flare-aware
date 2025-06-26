import { useEffect, useState } from "react";
import { IngredientDB } from "@/types";
import { INGREDIENT_UNITS_SELECT, UNCOUNTABLE_UNITS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IngredientSelect } from "./ingredient-select";
import { UnitSelect } from "./unit-select";
import AmountInput from "./amount-input";
import ExtraInfoInput from "./extra-info-input";
import { Button } from "@/components/ui/button";
import { NewIngredientDialog } from "./new-ingredient-dialog";
import {
  FieldErrors,
  useController,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { UserIngredientFormInput } from "@/lib/validator";

const IngredientCard = ({
  allIngredients,
  index,
  onRemove,
}: {
  allIngredients: IngredientDB[];
  onRemove: () => void;
  index: number;
}) => {
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

  const { errors } = useFormState();

  const ingredientErrors = Array.isArray(errors.ingredients)
    ? (errors.ingredients[index] as
        | FieldErrors<UserIngredientFormInput>
        | undefined)
    : undefined;


  const ingredientIdError = ingredientErrors?.ingredientId;
  const recognisedIngredient = !ingredientIdError;

  const dbIngredient = !recognisedIngredient
    ? allIngredients.find((i) => i.id === ingredientId.value) ?? null
    : null;

  const displayIconFile = !recognisedIngredient ? dbIngredient?.iconFile : "❔";

  function handleNewIngredientSave(newName: string, newId: string) {
    name.onChange(newName);
    ingredientId.onChange(newId);
  }

  return (
    <Card
      className={
        recognisedIngredient ? "mb-2" : "bg-yellow-100 border-yellow-300 mb-2"
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          {recognisedIngredient ? (
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
            {!recognisedIngredient && (
              <NewIngredientDialog
                ingredients={allIngredients}
                name={name.value}
                onSave={handleNewIngredientSave}
              />
            )}

            <div>
              <AmountInput field={amount} error={ingredientErrors?.amount} />
              <UnitSelect
                field={unit}
                amount={amount.value}
                options={INGREDIENT_UNITS_SELECT}
                error={ingredientErrors?.unit}
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
