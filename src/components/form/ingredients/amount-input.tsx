import { useEffect, useRef, useState } from "react";
import { IngredientDB } from "@/types";
import { Input } from "@/components/ui/input";

type ParsedIngredient = {
  ingredient: IngredientDB;
  amount: string;
  unit: string;
  extraInfo?: string;
  rawIngredient: string;
};

type AmountInputProps = {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
};

const AmountInput = ({ field }: AmountInputProps) => {
  const { value: selectedAmount, onChange } = field;
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isBeingEdited) {
      inputRef.current?.focus();
    }
  }, [isBeingEdited]);

  const handleAmountKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsBeingEdited(false);
    }
  };

  const handleAmountBlur = () => {
    setIsBeingEdited(false);
  };

  return (
    <div>
      {isBeingEdited ? (
        <Input
          ref={inputRef}
          type="number"
          value={selectedAmount}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleAmountBlur}
          onKeyDown={handleAmountKeyDown}
          className="w-20 h-7 px-2 text-right"
        />
      ) : (
        <span
          className="ml-1 cursor-pointer bg-muted px-1 py-0.5 rounded hover:bg-muted-foreground/10"
          onClick={() => setIsBeingEdited(true)}
        >
          {selectedAmount}
        </span>
      )}
    </div>
  );
};

export default AmountInput;
