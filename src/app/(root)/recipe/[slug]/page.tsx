import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/lib/actions/recipe.actions";
import Header from "@/components/shared/header";

const RecipeDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;

  const { slug } = params;

  const recipe = await getRecipeBySlug(slug);
  if (!recipe) notFound();

  return (

      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">
            <div className="flex flex-col">
              <div>IMAGE </div>
              <div>INGREDIENTS </div>
              <div>EXTRA NOTES </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="col-span-3">
            <div className="flex flex-col">
              <div>SERVINGS + TIME </div>
              <div>SOURCE </div>
              <div>NUTRIENTS </div>
              <div>INSTRUCTIONS </div>
            </div>
          </div>
        </div>
      </section>

  );
};

export default RecipeDetailsPage;
