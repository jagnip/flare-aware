import MobileNavigation from "@/components/shared/mobile-navigation";
import MobileMenuSheet from "@/components/shared/mobile-navigation/content";
import MobileMenuTrigger from "@/components/shared/mobile-navigation/trigger";
import AppSidebar from "@/components/shared/sidebar-navigation";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen relative">
      <SidebarProvider>
        <AppSidebar />
        <div className="absolute wrapper md:hidden">
          <MobileNavigation>
            <MobileMenuTrigger />
            <MobileMenuSheet />
          </MobileNavigation>
        </div>
        <div className="flex flex-col w-full">
          <main className="flex-1 ">{children} </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
