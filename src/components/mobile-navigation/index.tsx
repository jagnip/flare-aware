"use client";

import { Sheet } from "@/components/ui/sheet";
import { ReactNode } from "react";

type MobileNavigationProps = {
  children: ReactNode;
};

const MobileNavigation = ({ children }: MobileNavigationProps) => {
  return <Sheet>{children}</Sheet>;
};

export default MobileNavigation;
