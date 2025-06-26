"use client";

import { Calendar, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import { CollectionDB } from "@/types";
import { ROUTES } from "@/lib/constants";

// Same data
const tools = [
  {
    title: "Planner",
    url: "/planner",
    icon: Calendar,
  },
  {
    title: "Grocery list",
    url: "/grocery-list",
    icon: ShoppingCart,
  },
];

const MobileMenuSheet = ({ collections }: { collections: CollectionDB[] }) => {
  return (
    <SheetContent side="left" className="w-[250px] p-4">
      <SheetTitle className="text-lg mb-4">Navigation</SheetTitle>

      <nav className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            Tools
          </h3>
          <ul className="space-y-1">
            {tools.map((tool) => (
              <li key={tool.url}>
                <Link
                  href={tool.url}
                  className="flex items-center gap-2 py-1.5"
                >
                  <tool.icon size={16} />
                  <span>{tool.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            Collections
          </h3>
          <ul className="space-y-1">
            {collections.map((collection) => (
              <li key={collection.id}>
                <Link
                  href={ROUTES.COLLECTION_DETAIL(collection.slug)}
                  className="flex items-center gap-2 py-1.5"
                >
                  {/* <collection.icon size={16} /> */}
                  <span>{collection.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </SheetContent>
  );
};

export default MobileMenuSheet;
