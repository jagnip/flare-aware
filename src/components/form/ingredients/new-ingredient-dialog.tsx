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
import IconPicker from "./icon-picker";
import { INGREDIENT_CATEGORIES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateIngredient } from "@/hooks/useIngredients";

type IngredientDialogProps = {
  name: string;
  onSave: (newIngredient: IngredientDB) => void;
  ingredients: IngredientDB[];
};
export function NewIngredientDialog({
  name,
  onSave,
  ingredients,
}: IngredientDialogProps) {
  const [open, setOpen] = useState(false);
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
      category: "BAKERY_PRODUCTS",
    },
  });
  const createIngredientMutation = useCreateIngredient();

  const onInnerSubmit = (data: IngredientFormInput) => {
    createIngredientMutation.mutate(data, {
      onSuccess: (newIng) => {
        onSave(newIng);
        setOpen(false);
      },
    });
  };

  const handleInnerSubmit = form.handleSubmit;

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event?.stopPropagation?.();

    return handleInnerSubmit(onInnerSubmit, (errors) =>
      console.log("❌ Zod/RHF validation failed:", errors)
    )(event);
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
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(INGREDIENT_CATEGORIES).map(
                          ([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={form.control}
                  name="iconFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Density (g/mL)</FormLabel>
                      <FormControl>
                        <IconPicker
                          ingredients={ingredients}
                          value={field.value}
                          onChange={field.onChange}
                        ></IconPicker>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* {Object.entries(
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
                ))} */}
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
