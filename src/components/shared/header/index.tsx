import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const Header = () => {
  return (

      <header className="w-full border-b">
        <div className="wrapper">
          <div className="space-x-2 flex justify-end items-center">
            <div className="flex gap-2">
              <ThemeToggle />
              <Button asChild>
                <Link href="/collections/add">Primary button</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
   
 
  );
};

export default Header;
