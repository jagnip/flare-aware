import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRecipeBySlug } from "@/lib/actions/recipe.actions";

const RecipeDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;

  const { slug } = params;

  const product = await getRecipeBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}

          <div className="col-span-2">
            <div className="flex flex-col">
              <div>IMAGE </div>
              <div>TAGS </div>
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
    </>
  );
};

export default RecipeDetailsPage;
