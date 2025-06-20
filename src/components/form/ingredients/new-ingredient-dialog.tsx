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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IngredientDB } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ingredientSchema, IngredientFormInput } from "@/lib/validator";

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
  const form = useForm<IngredientFormInput>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name,
      iconFile: "",
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      density: 0,
    },
  });
  const [selectedIcon, setSelectedIcon] = useState("❔");
  const [open, setOpen] = useState(false);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(form.getValues());
    form.handleSubmit((data) => {
      console.log("hello from handleSubmit");
      onSave(data.name, selectedIcon);
      setOpen(false);
    })(e);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add ingredient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={handleSubmitForm}>
            <DialogHeader>
              <DialogTitle>Add ingredient</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Milk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calories (per 100g)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="protein"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Protein (g/100g)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fat (g/100g)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carbs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carbs (g/100g)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="density"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Density (g/mL)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          variant={
                            icon === selectedIcon ? "default" : "outline"
                          }
                          onClick={() => setSelectedIcon(icon)}
                        >
                          <img
                            src={`/ingredients/${icon}`}
                            alt=""
                            className="w-6 h-6"
                          />
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
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
