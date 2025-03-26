import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-end">
        <div className="space-x-2 flex-between">
          <ThemeToggle />
          <Button asChild>
            <Link href="/collections/add">Add collection</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
