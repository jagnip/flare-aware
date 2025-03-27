import { Sidebar } from "@/components/ui/sidebar";
import AppSidebarHeader from "./header";
import AppSidebarFooter from "./footer";
import AppSidebarContent from "./content";

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />
      <AppSidebarContent />
      <AppSidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
