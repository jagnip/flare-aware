import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import MobileMenuTrigger from "../mobile-navigation/trigger";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper">
        <div className="space-x-2 flex justify-between md:justify-end items-center">
          <MobileMenuTrigger />
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
