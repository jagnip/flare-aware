import { getDisplayUnit } from "@/lib/utils";

type IngredientCardSelect = {
  selectedOption: string;
  amount: string;
  setIsOpen: (isOpen: boolean) => void;
};

export const IngredientCardSelectTrigger = ({
  selectedOption,
  amount,
  setIsOpen,
}: IngredientCardSelect) => {
  return (
    <span
      className="ml-1 cursor-pointer bg-muted px-1 py-0.5 rounded hover:bg-muted-foreground/10"
      onClick={() => setIsOpen(true)}
    >
      {getDisplayUnit(selectedOption, amount)}
    </span>
  );
};
