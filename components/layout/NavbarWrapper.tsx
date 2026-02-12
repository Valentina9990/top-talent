"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

// Routes where the main Navbar is hidden (e.g. dashboards with their own sidebar)
const HIDDEN_NAVBAR_ROUTES = ["/dashboard-escuela"];

export const NavbarWrapper = () => {
  const pathname = usePathname();

  const shouldHide = HIDDEN_NAVBAR_ROUTES.some((route) =>
    pathname?.startsWith(route)
  );

  if (shouldHide) return null;

  return <Navbar />;
};
