import { LibraryBig, Calendar, ShoppingCart } from "lucide-react";

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    url: "/collections",
    icon: LibraryBig,
  },
  {
    url: "/planner",
    icon: Calendar,
  },
  {
    url: "/grocery-list",
    icon: ShoppingCart,
  },
];

const PrimarySidebarContent = () => {
  return (
    <SidebarContent>
      <SidebarMenu className="flex items-center">
        {items.map((item) => (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
};

export default PrimarySidebarContent;
