import { Calendar, ShoppingCart, Plus } from "lucide-react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CollectionDB } from "@/types";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

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

const AppSidebarContent = ({
  collections,
}: {
  collections: CollectionDB[];
}) => {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Tools</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {tools.map((tool) => (
              <SidebarMenuItem key={tool.url}>
                <SidebarMenuButton asChild>
                  <a href={tool.url}>
                    <tool.icon />
                    <span>{tool.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Collections</SidebarGroupLabel>
        <SidebarGroupAction>
          <Plus /> <span className="sr-only">Add collection</span>
        </SidebarGroupAction>
        <SidebarGroupContent>
          <SidebarMenu>
            {collections.map((collection) => (
              <SidebarMenuItem key={collection.slug}>
                <SidebarMenuButton asChild>
                  <Link
                    href={ROUTES.COLLECTION_DETAIL(collection.slug)}
                    className="flex items-center gap-2 py-1.5"
                  >
                    {collection.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default AppSidebarContent;
