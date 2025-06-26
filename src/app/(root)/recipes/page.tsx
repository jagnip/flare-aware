import Header from "@/components/header";
import RecipeList from "@/components/recipe/recipe-list";
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
