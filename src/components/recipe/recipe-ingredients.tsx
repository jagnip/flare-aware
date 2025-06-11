import { JsonValue } from "@prisma/client/runtime/library";
import { RecipeSection } from "./recipe-section";
import { IngredientDB } from "@/types";

const RecipeIngredients = ({ ingredients }: { ingredients: JsonValue[] }) => {
  const typedIngredients = ingredients as IngredientDB[];

  return (
    <RecipeSection title="Ingredients">
      <ul className="list-disc pl-5 space-y-1">
        {typedIngredients.map((ingredient) => (
          <li key={ingredient.ingredient} className="text-sm">
            {ingredient.quantity ? `${ingredient.quantity} ` : ""}
            {ingredient.ingredient}
          </li>
        ))}
      </ul>
    </RecipeSection>
  );
};
