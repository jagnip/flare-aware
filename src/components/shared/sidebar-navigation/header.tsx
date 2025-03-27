import Link from "next/link";
import Image from "next/image";
import { SidebarHeader } from "@/components/ui/sidebar";

const AppSidebarHeader = () => {
  return (
    <SidebarHeader>
      {" "}
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Brocololo Logo"
          width={32}
          height={32}
        />
      </Link>
    </SidebarHeader>
  );
};

export default AppSidebarHeader;
