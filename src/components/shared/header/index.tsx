import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import DeleteRecipeForm from "../recipe/delete-recipe-form";

const Header = ({ recipeId }: { recipeId?: string }) => {
  return (
    <header className="w-full border-b">
      <div className="wrapper">
        <div className="space-x-2 flex justify-end items-center">
          <div className="flex gap-2">
            <ThemeToggle />
            {recipeId && <DeleteRecipeForm id={recipeId} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
