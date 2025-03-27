import { Sidebar } from "@/components/ui/sidebar";
import PrimarySidebarHeader from "./header";
import PrimarySidebarFooter from "./footer";
import PrimarySidebarContent from "./content";

const PrimarySidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <PrimarySidebarHeader />
      <PrimarySidebarContent />
      <PrimarySidebarFooter />
    </Sidebar>
  );
};

export default PrimarySidebar;
