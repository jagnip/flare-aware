import { useEffect, useRef, useState } from "react";
import { IngredientDB, IngredientDummyDB } from "@/types";
import { INGREDIENT_UNITS_SELECT, UNCOUNTABLE_UNITS } from "@/lib/constants";
import { getDisplayString } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IngredientSelect } from "./ingredient-select";
import { UnitSelect } from "./unit-select";
import { INGREDIENTS_MAP } from "@/app/db/ingredients";
import { Input } from "@/components/ui/input";

type ParsedIngredient = {
  ingredient: IngredientDummyDB;
  amount: string;
  unit: string;
  extraInfo?: string;
  rawIngredient: string;
};

const AmountInput = ({ ingredient }: { ingredient: ParsedIngredient }) => {
  const [selectedAmount, setSelectedAmount] = useState(ingredient.amount);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleAmountKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleAmountBlur = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <Input
          ref={inputRef}
          type="number"
          value={selectedAmount}
          onChange={(e) => setSelectedAmount(e.target.value)}
          onBlur={handleAmountBlur}
          onKeyDown={handleAmountKeyDown}
          className="w-20 h-7 px-2 text-right"
        />
      ) : (
        <span
          className="ml-1 cursor-pointer bg-muted px-1 py-0.5 rounded hover:bg-muted-foreground/10"
          onClick={() => setIsEditing(true)}
        >
          {selectedAmount}
        </span>
      )}
    </div>
  );
};

export default AmountInput;
