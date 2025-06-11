import MobileNavigation from "@/components/mobile-navigation";
import MobileMenuSheet from "@/components/mobile-navigation/content";
import MobileMenuTrigger from "@/components/mobile-navigation/trigger";
import AppSidebar from "@/components/sidebar-navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { getCollections } from "@/lib/actions/collection.actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collections = await getCollections();

  return (
    <div className="flex h-screen relative">
      <SidebarProvider>
        <AppSidebar collections={collections} />
        <div className="absolute wrapper md:hidden">
          <MobileNavigation>
            <MobileMenuTrigger />
            <MobileMenuSheet collections={collections} />
          </MobileNavigation>
        </div>
        <div className="flex flex-col w-full">
          <main className="flex-1 ">{children}</main>
        </div>
      </SidebarProvider>
      <Toaster />
    </div>
  );
}
