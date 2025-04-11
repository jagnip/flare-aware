import Header from "@/components/shared/header";
import RecipeList from "@/components/shared/recipe/recipe-list";
import { getRecipePreviews} from "@/lib/actions/recipe.actions";

export const metadata = {
  title: "Brocololo",
};

const Homepage = async () => {
  const recipes = await getRecipePreviews();

  return (
    <>
      <Header />
      <RecipeList recipes={recipes} />
    </>
  );
};

export default Homepage;
