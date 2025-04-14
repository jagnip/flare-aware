import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/lib/actions/recipe.actions";
import Header from "@/components/shared/header";
import { Badge } from "@/components/ui/badge";
import { FullRecipe } from "@/types";
import Link from "next/link";
import { RecipeIngredients } from "@/components/shared/recipe/recipe-ingredients";
import { RecipeNutrition } from "@/components/shared/recipe/recipe-nutrition";
import { RecipeInfo } from "@/components/shared/recipe/recipe-info";
import { RecipeSection } from "@/components/shared/recipe/recipe-section";
import { RecipeInstructions } from "@/components/shared/recipe/recipe-instructions";
import { RecipeNotes } from "@/components/shared/recipe/recipe-notes";

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
    nutritionalValue,
    servings,
    handsOffTime,
    handsOnTime,
    source,
    instructions,
    notes,
  } = recipe as FullRecipe;

  return (
    <>
      <Header />
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">
            <div className="flex flex-col">
              <div>IMAGE </div>

              <div>
                {collections.map((collection) => (
                  <Badge key={collection.id}>{collection.name}</Badge>
                ))}
              </div>

              <RecipeIngredients ingredients={ingredients} />
              <RecipeNutrition nutritionalValue={nutritionalValue} />
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

              {source && (
                <Link
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {source.name}
                </Link>
              )}

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
