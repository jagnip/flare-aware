import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const MobileMenuTrigger = () => {
  return (
    <SheetTrigger asChild className="md:hidden">
      <Button variant="outline" size="icon">
        <Menu />
        <span className="sr-only">Open menu</span>
      </Button>
    </SheetTrigger>
  );
};

export default MobileMenuTrigger;
