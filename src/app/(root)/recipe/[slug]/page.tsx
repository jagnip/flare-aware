import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/lib/actions/recipe.actions";
import Header from "@/components/shared/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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
  } = recipe;

  console.log(recipe);

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
              <Card>
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {ingredients.map((ingredient) => (
                      <li key={ingredient.id} className="text-sm">
                        {ingredient.amount ? `${ingredient.amount} ` : ""}{" "}
                        {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Nutritional value</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl>
                    {nutritionalValue ? (
                      <div>
                        <dt>Calories:</dt>
                        <dd>{nutritionalValue.kcal} kcal</dd>
                      </div>
                    ) : (
                      ""
                    )}

                    {nutritionalValue ? (
                      <div>
                        <dt>Carbs:</dt>
                        <dd>{nutritionalValue.carbs}g</dd>
                      </div>
                    ) : (
                      ""
                    )}

                    {nutritionalValue ? (
                      <div>
                        <dt>Fat:</dt>
                        <dd>{nutritionalValue.fat}g</dd>
                      </div>
                    ) : (
                      ""
                    )}

                    {nutritionalValue ? (
                      <div>
                        <dt>Protein:</dt>
                        <dd>{nutritionalValue.protein}g</dd>
                      </div>
                    ) : (
                      ""
                    )}
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Details Column */}
          <div className="col-span-3">
            <div className="flex flex-col">
              <Card>
                <CardHeader>
                  <CardTitle>Recipe Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl>
                    {servings ? (
                      <div>
                        <dt>Servings:</dt>
                        <dd>{servings}</dd>
                      </div>
                    ) : (
                      ""
                    )}

                    {handsOnTime ? (
                      <div>
                        <dt>Preparation time:</dt>
                        <dd>{handsOnTime} minutes</dd>
                      </div>
                    ) : (
                      ""
                    )}

                    {handsOffTime ? (
                      <div>
                        <dt>Cooking time:</dt>
                        <dd>{handsOffTime} minutes</dd>
                      </div>
                    ) : (
                      ""
                    )}
                  </dl>
                </CardContent>
              </Card>

              {source && (
                <Card>
                  <CardHeader>
                    <CardTitle>Source</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {source.name}
                    </Link>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 space-y-2">
                    {instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecipeDetailsPage;
