// components/recipe/RecipeInfo.tsx
import { RecipeSection } from "./recipe-section";

interface RecipeInfoProps {
  servings: number | null;
  handsOnTime: number | null;
  handsOffTime: number | null;
}

export const RecipeInfo = ({
  servings,
  handsOnTime,
  handsOffTime,
}: RecipeInfoProps) => (
  <RecipeSection title="Recipe Info">
    <dl>
      {servings ? (
        <div>
          <dt>Servings:</dt>
          <dd>{servings}</dd>
        </div>
      ) : null}

      {handsOnTime ? (
        <div>
          <dt>Preparation time:</dt>
          <dd>{handsOnTime} minutes</dd>
        </div>
      ) : null}

      {handsOffTime ? (
        <div>
          <dt>Cooking time:</dt>
          <dd>{handsOffTime} minutes</dd>
        </div>
      ) : null}
    </dl>
  </RecipeSection>
);
