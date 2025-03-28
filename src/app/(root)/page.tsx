import RecipeList from "@/components/shared/product/product-list";
import { recipes } from "../db/sample-data";

export const metadata = {
  title: "Brocololo",
};

const Homepage = () => {
  return (
    <div>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default Homepage;
