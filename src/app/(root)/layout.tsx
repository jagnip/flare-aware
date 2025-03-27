import Header from "@/components/shared/header";
import SidebarNavigation from "@/components/shared/sidebar-navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <SidebarNavigation />
      <div className="flex flex-col w-full">
        <Header />
        <main className="flex-1 wrapper">{children} </main>
      </div>
    </div>
  );
}
