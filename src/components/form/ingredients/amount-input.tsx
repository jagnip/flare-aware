import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { FieldErrors } from "react-hook-form";
import { UserIngredientFormInput } from "@/lib/validator";
import { cn } from "@/lib/utils";

type AmountInputProps = {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  error?: FieldErrors<UserIngredientFormInput>["amount"];
};

const AmountInput = ({ field, error }: AmountInputProps) => {
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
  
  const isError = !!error;

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
        className={cn(
          "ml-1 cursor-pointer bg-muted px-1 py-0.5 rounded hover:bg-muted-foreground/10",
          isError && "bg-destructive text-destructive-foreground"
        )}
          onClick={() => setIsBeingEdited(true)}
        >
          {selectedAmount}
        </span>
      )}
    </div>
  );
};

export default AmountInput;
