import { notFound } from "next/navigation";
import Header from "@/components/shared/header";
import { getRecipesByCollectionSlug } from "@/lib/actions/collection.actions";
import RecipeList from "@/components/shared/recipe/recipe-list";

const CollectionPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;

  const { slug } = params;

  const collection = await getRecipesByCollectionSlug(slug);
  if (!collection) notFound();

  return (
    <>
      <Header />
      <RecipeList recipes={collection.recipes || []} />
    </>
  );
};

export default CollectionPage;
