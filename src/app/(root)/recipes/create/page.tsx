import Header from "@/components/shared/header";
import RecipeList from "@/components/shared/recipe/recipe-list";
import { getRecipePreviews} from "@/lib/actions/recipe.actions";

export const metadata = {
  title: "Brocololo",
};

const CreateRecipe = async () => {
  const recipes = await getRecipePreviews();

  return (
    <>
      <Header />
      <h2 className='h2-bold'>Create Product</h2>
      <div className='my-8'>LOL</div>
    </>
  );
};

export default CreateRecipe;
