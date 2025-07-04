// import { Recipe } from "@/types/recipe";
import { RecipeDB } from "@/types";
import RecipeCard from "./recipe-card";

const RecipeList = ({ recipes }: { recipes: RecipeDB[] }) => {
  return (
    <div className="my-10">
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recipes.map((recipe: RecipeDB) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div>
          <p>No recipe found</p>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
