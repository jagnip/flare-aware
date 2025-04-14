import { RecipeSection } from "./recipe-section";
import { Ingredient } from "@/types";

export const RecipeIngredients = ({ ingredients }: {ingredients: Ingredient[]}) => (
  <RecipeSection title="Ingredients">
    <ul className="list-disc pl-5 space-y-1">
      {ingredients.map((ingredient) => (
        <li key={ingredient.id} className="text-sm">
          {ingredient.amount ? `${ingredient.amount} ` : ""}{ingredient.name}
        </li>
      ))}
    </ul>
  </RecipeSection>
);