import { useEffect, useRef, useState } from "react";
import { UserIngredientDB, IngredientDB } from "@/types";
import { INGREDIENT_UNITS_SELECT, UNCOUNTABLE_UNITS } from "@/lib/constants";
import { getDisplayString } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IngredientSelect } from "./ingredient-select";
import { UnitSelect } from "./unit-select";
import { INGREDIENTS_MAP } from "@/app/db/ingredients";
import { Input } from "@/components/ui/input";

type ParsedIngredient = {
  ingredient: IngredientDB;
  amount: string;
  unit: string;
  extraInfo?: string;
  rawIngredient: string;
};

type ExtraInfoInputProps = {
  field: {
    value: string;
    onChange: (val: string) => void;
  };
};

const ExtraInfoInput = ({ field }: ExtraInfoInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { value: extraInfo, onChange } = field;

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
          value={extraInfo}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditing(false);
            }
          }}
          placeholder="Add extra info"
        />
      ) : (
        <span
          className="ml-1 cursor-pointer bg-muted px-1 py-0.5 rounded hover:bg-muted-foreground/10"
          onClick={() => setIsEditing(true)}
        >
          {extraInfo || "Add extra info"}
        </span>
      )}
    </div>
  );
};

export default ExtraInfoInput;
