import {
  Folders,
  PackageOpen,
  Trash2,
  Calendar,
  ShoppingCart,
  Plus,
} from "lucide-react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collection } from "@/types";

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

const collections = [
  {
    title: "All recipes",
    url: "/allrecipes",
    icon: Folders,
  },
  {
    title: "Uncategorized",
    url: "/uncategorized",
    icon: PackageOpen,
  },
  {
    title: "Archive",
    url: "/archive",
    icon: Trash2,
  },
];

const AppSidebarContent = ({ collections }: {collections:Collection[]}) => {
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
                  <a href={collection.slug}>
                    {/* <collection.icon /> */}
                    <span>{collection.name}</span>
                  </a>
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
