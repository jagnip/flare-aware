import { Button } from "@/components/ui/button";
import { IngredientDB } from "@/types";

type IconPickerProps = {
  ingredients: IngredientDB[];
  value: string;
  onChange: (icon: string) => void;
}

export default function IconPicker({
  ingredients,
  value,
  onChange,
}: IconPickerProps) {
  const categories = ingredients.reduce((acc, { category, iconFile }) => {
    if (!acc[category]) acc[category] = new Set<string>();
    acc[category].add(iconFile);
    return acc;
  }, {} as Record<string, Set<string>>);

  return (
    <div>
      {Object.entries(categories).map(([category, icons]) => (
        <div key={category}>
          <p className="text-sm font-medium">{category}</p>
          <div className="flex flex-wrap gap-2 mt-2 mb-4">
            {[...icons].map((icon) => (
              <Button
                key={icon}
                type="button"
                variant={icon === value ? "default" : "outline"}
                onClick={() => onChange(icon)}
              >
                <img src={`/ingredients/${icon}`} alt="" className="w-6 h-6" />
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}