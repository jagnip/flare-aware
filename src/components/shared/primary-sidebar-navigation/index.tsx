import { LibraryBig, Calendar, ShoppingCart } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const PrimarySidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {" "}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Brocololo Logo"
            width={32}
            height={32}
          />
        </Link>
      </SidebarHeader>
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
      <SidebarFooter>
        {" "}
        <Avatar>
          <AvatarImage src="/images/avatar.png" alt="Your avatar" />
          <AvatarFallback>JG</AvatarFallback>
        </Avatar>
      </SidebarFooter>
    </Sidebar>
  );
};

export default PrimarySidebar;
