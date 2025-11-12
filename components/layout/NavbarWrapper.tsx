"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export const NavbarWrapper = () => {
  const pathname = usePathname();
  
  if (pathname?.startsWith("/dashboard-escuela")) {
    return null;
  }

  return <Navbar />;
};
