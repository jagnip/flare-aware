import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Recipe } from "@/types/recipe";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { RecipePreview } from "@/types";
import { ROUTES } from "@/lib/constants";

const RecipeCard = ({ recipe }: { recipe: RecipePreview }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 flex justify-center items-center">
        <Link href={ROUTES.RECIPE_DETAIL(recipe.slug)}>
          {recipe.images ? (
            <Image
              priority={true}
              src={recipe.images[0]}
              alt={recipe.name}
              className="aspect-square object-cover rounded"
              height={300}
              width={300}
            />
          ) : (
            <div className="w-[300px] h-[300px] flex justify-center items-center">
              Photo placeholder
            </div>
          )}
        </Link>
      </CardHeader>
      <CardContent>
        <Link href={ROUTES.RECIPE_DETAIL(recipe.slug)}>
          <h2>{recipe.name}</h2>
        </Link>
        {recipe.handsOnTime && <Badge>{recipe.handsOnTime} mins</Badge>}
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
