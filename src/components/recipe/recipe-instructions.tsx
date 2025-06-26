import { RecipeSection } from "./recipe-section";

export const RecipeInstructions = ({ instructions }: { instructions: string[] }) => (
    <RecipeSection title="Instructions">
      <ol className="list-decimal pl-5 space-y-2">
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </RecipeSection>
  );