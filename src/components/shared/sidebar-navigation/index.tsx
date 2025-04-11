import { Sidebar } from "@/components/ui/sidebar";
import AppSidebarHeader from "./header";
import AppSidebarFooter from "./footer";
import AppSidebarContent from "./content";
import { Collection } from "@/types";

type AppSidebarProps = {
  collections: Collection[];
};

const AppSidebar = ({ collections }: AppSidebarProps) => {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />
      <AppSidebarContent collections={collections} />
      <AppSidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
