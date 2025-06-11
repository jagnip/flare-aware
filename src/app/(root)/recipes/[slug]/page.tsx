import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/lib/actions/recipe.actions";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { RecipeDB } from "@/types";
import Link from "next/link";
// import { RecipeIngredients } from "@/components/shared/recipe/recipe-ingredients";
import { RecipeNutrition } from "@/components/recipe/recipe-nutrition";
import { RecipeInfo } from "@/components/recipe/recipe-info";
import { RecipeInstructions } from "@/components/recipe/recipe-instructions";
import { RecipeNotes } from "@/components/recipe/recipe-notes";
import RecipeImages from "@/components/recipe/recipe-image";

const RecipeDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const { slug } = params;

  const recipe = await getRecipeBySlug(slug);
  if (!recipe) notFound();

  const {
    collections,
    ingredients,
    servings,
    handsOffTime,
    handsOnTime,
    source,
    instructions,
    notes,
    images,
  } = recipe as RecipeDB;

  console.log(recipe);

  return (
    <>
      <Header recipeId={recipe.id} />
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">
            <div className="flex flex-col">
              <div className="col-span-2">
                <RecipeImages images={images} />
              </div>
              <div>
                {collections.map((collection) => (
                  <Badge key={collection.id}>{collection.name}</Badge>
                ))}
              </div>
              {/* <RecipeIngredients ingredients={ingredients} /> */}
              {/* <RecipeNutrition nutritionalValue={nutritionalValue} /> */}
            </div>
          </div>

          {/* Details Column */}
          <div className="col-span-3">
            <div className="flex flex-col">
              <RecipeInfo
                servings={servings}
                handsOnTime={handsOnTime}
                handsOffTime={handsOffTime}
              />

              {source && <p>{source}</p>}

              <RecipeInstructions instructions={instructions} />
              {notes && <RecipeNotes notes={notes} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecipeDetailsPage;
