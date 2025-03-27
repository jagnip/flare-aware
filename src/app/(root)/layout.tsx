import Header from "@/components/shared/header";
import PrimarySidebar from "@/components/shared/primary-sidebar-navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <SidebarProvider defaultOpen={false}>
        <PrimarySidebar />
        <div className="flex flex-col w-full">
          <Header />
          <main className="flex-1 wrapper">{children} </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
