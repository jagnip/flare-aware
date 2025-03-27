import Link from "next/link";
import Image from "next/image";
import { SidebarHeader } from "@/components/ui/sidebar";

const PrimarySidebarHeader = () => {
  return (
    <SidebarHeader>
      {" "}
      <Link href="/" className="flex items-center">
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

export default PrimarySidebarHeader;
