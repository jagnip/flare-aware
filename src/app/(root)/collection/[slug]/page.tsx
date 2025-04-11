import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/lib/actions/recipe.actions";
import Header from "@/components/shared/header";
import { getCollectionBySlug } from "@/lib/actions/collection.actions";
import RecipeList from "@/components/shared/recipe/recipe-list";

const CollectionPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;

  const { slug } = params;

  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  return (
    <>
      <Header />
      <RecipeList recipes={collection.recipes || []} />
    </>
  );
};

export default CollectionPage;
