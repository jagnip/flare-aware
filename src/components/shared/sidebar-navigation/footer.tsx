import { SidebarFooter } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AppSidebarFooter = () => {
  return (
    <SidebarFooter>
      {" "}
      <Avatar>
        <AvatarImage src="/images/avatar.png" alt="Your avatar" />
        <AvatarFallback>JG</AvatarFallback>
      </Avatar>
    </SidebarFooter>
  );
};

export default AppSidebarFooter;
