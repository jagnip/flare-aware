import Header from "@/components/shared/header";
import RecipeList from "@/components/shared/recipe/recipe-list";
import { getRecipes } from "@/lib/actions/recipe.actions";

const RecipesPage = async () => {
  const recipes = await getRecipes();

  return (
    <>
      <Header />
      <RecipeList recipes={recipes} />
    </>
  );
};

export default RecipesPage;
