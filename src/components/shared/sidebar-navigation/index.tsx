import { Sidebar } from "@/components/ui/sidebar";
import AppSidebarHeader from "./header";
import AppSidebarFooter from "./footer";
import AppSidebarContent from "./content";
import { CollectionDB } from "@/types";

const AppSidebar = ({ collections }: { collections: CollectionDB[] }) => {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />
      <AppSidebarContent collections={collections} />
      <AppSidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
