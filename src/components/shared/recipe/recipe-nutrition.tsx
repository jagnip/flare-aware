import { RecipeSection } from "./recipe-section";
import { NutritionalValue } from "@/types";

export const RecipeNutrition = ({ nutritionalValue }: {
  nutritionalValue: NutritionalValue | null;
}) => (
  <RecipeSection title="Nutritional value">
    <dl>
      {nutritionalValue ? (
        <>
          <div>
            <dt>Calories:</dt>
            <dd>{nutritionalValue.kcal} kcal</dd>
          </div>
          <div>
            <dt>Carbs:</dt>
            <dd>{nutritionalValue.carbs}g</dd>
          </div>
          <div>
            <dt>Fat:</dt>
            <dd>{nutritionalValue.fat}g</dd>
          </div>
          <div>
            <dt>Protein:</dt>
            <dd>{nutritionalValue.protein}g</dd>
          </div>
        </>
      ) : (
        <p>No nutritional information available</p>
      )}
    </dl>
  </RecipeSection>
);