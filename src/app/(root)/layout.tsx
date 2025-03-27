import Header from "@/components/shared/header";
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
          <Header />
          <main className="flex-1 wrapper">{children} </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
