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
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

type IngredientDialogProps = {
  name: string;
  onSave: (name: string) => void;
};
export function NewIngredientDialog({ name, onSave }: IngredientDialogProps) {
  const [inputName, setInputName] = useState(name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave(inputName);
    console.log("hello from handle Submit");
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
            <div>
              {AVAILABLE_ICONS.map((icon) => (
                <Button type="button" >{icon}</Button>
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
