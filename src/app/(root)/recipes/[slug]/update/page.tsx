import RecipeForm from "@/components/form/recipe-form";
import Header from "@/components/header";

export const metadata = {
  title: "Brocololo",
};

const UpdateRecipe = async () => {
  return (
    <>
      <Header />
      <div className="my-8">
        <RecipeForm />
      </div>
    </>
  );
};

export default UpdateRecipe;
