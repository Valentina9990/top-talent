"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

// Routes where the Footer is hidden (auth flows, dashboards with their own layout)
const HIDDEN_FOOTER_ROUTES = ["/auth", "/dashboard-escuela", "/dashboard"];

export const FooterWrapper = () => {
  const pathname = usePathname();

  const shouldHide = HIDDEN_FOOTER_ROUTES.some((route) =>
    pathname?.startsWith(route)
  );

  if (shouldHide) return null;

  return <Footer />;
};
