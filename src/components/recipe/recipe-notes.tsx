import { RecipeSection } from "./recipe-section";

interface RecipeNotesProps {
  notes: string;
}

export const RecipeNotes = ({ notes }: RecipeNotesProps) => (
  <RecipeSection title="Notes">
    <p>{notes}</p>
  </RecipeSection>
);