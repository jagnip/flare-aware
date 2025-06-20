import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AVAILABLE_ICONS } from "@/lib/constants";
import { IngredientDB } from "@/types";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

type IngredientDialogProps = {
  name: string;
  onSave: (name: string, icon: string) => void;
  ingredients: IngredientDB[];
};
export function NewIngredientDialog({
  name,
  onSave,
  ingredients,
}: IngredientDialogProps) {
  const [inputName, setInputName] = useState(name);
  const [selectedIcon, setSelectedIcon] = useState("❔");
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [density, setDensity] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave(inputName, selectedIcon);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add ingredient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add ingredient</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="calories">Calories (per 100g)</Label>
              <Input
                type="number"
                id="calories"
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="protein">Protein (g/100g)</Label>
              <Input
                type="number"
                id="protein"
                value={protein}
                onChange={(e) => setProtein(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="fat">Fat (g/100g)</Label>
              <Input
                type="number"
                id="fat"
                value={fat}
                onChange={(e) => setFat(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="carbs">Carbs (g/100g)</Label>
              <Input
                type="number"
                id="carbs"
                value={carbs}
                onChange={(e) => setCarbs(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="density">Density (g/mL)</Label>
              <Input
                type="number"
                id="density"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
              />
            </div>
            <div>
              {Object.entries(
                ingredients.reduce((acc, ingredient) => {
                  const { category, iconFile } = ingredient;
                  if (!acc[category]) acc[category] = new Set();
                  acc[category].add(iconFile);
                  return acc;
                }, {} as Record<string, Set<string>>)
              ).map(([category, icons]) => (
                <div key={category}>
                  <p className="text-sm font-medium">{category}</p>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {[...icons].map((icon) => (
                      <Button
                        key={icon}
                        type="button"
                        variant={icon === selectedIcon ? "default" : "outline"}
                        onClick={() => setSelectedIcon(icon)}
                      >
                        <img src={`/ingredients/${icon}`} alt="" className="w-6 h-6" />
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
