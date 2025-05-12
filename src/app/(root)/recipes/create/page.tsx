import RecipeForm from "@/components/shared/form/recipe-form";
import Header from "@/components/shared/header";
import RecipeList from "@/components/shared/recipe/recipe-list";
import { getRecipePreviews } from "@/lib/actions/recipe.actions";

export const metadata = {
  title: "Brocololo",
};

const CreateRecipe = async () => {
  const recipes = await getRecipePreviews();

  return (
    <>
      <Header />
      <div className="my-8">
        <RecipeForm type="Create" />
      </div>
    </>
  );
};

export default CreateRecipe;
