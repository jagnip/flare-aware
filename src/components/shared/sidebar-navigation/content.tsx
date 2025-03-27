import { LibraryBig, Calendar, ShoppingCart } from "lucide-react";

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Collections",
    url: "/collections",
    icon: LibraryBig,
  },
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

const AppSidebarContent = () => {
  return (
    <SidebarContent>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
};

export default AppSidebarContent;
