import RecipeForm from "@/components/shared/form/recipe-form";
import Header from "@/components/shared/header";

export const metadata = {
  title: "Brocololo",
};

const CreateRecipe = async () => {

  return (
    <>
      <Header />
      <div className="my-8">
        <RecipeForm />
      </div>
    </>
  );
};

export default CreateRecipe;
