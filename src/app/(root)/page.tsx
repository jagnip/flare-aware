import RecipeList from "@/components/shared/recipe/recipe-list";
import { getRecipes } from "@/lib/actions/recipe.actions";

export const metadata = {
  title: "Brocololo",
};

const Homepage = async () => {

  const recipes = await getRecipes(); 
  return (
    <div>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default Homepage;
