import Header from "@/components/shared/header";
import MobileNavigation from "@/components/shared/mobile-navigation";
import MobileMenuSheet from "@/components/shared/mobile-navigation/content";
import AppSidebar from "@/components/shared/sidebar-navigation";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full">
          <MobileNavigation>
            <Header />
            <MobileMenuSheet />
          </MobileNavigation>
          <main className="flex-1 wrapper">{children} </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
