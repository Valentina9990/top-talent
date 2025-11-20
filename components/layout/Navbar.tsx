"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";
import { Menu, X } from "lucide-react";
import Image from 'next/image';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isAuthRoute = pathname?.startsWith("/auth");
  if (isAuthRoute) return null;

  const user = session?.user;
  const userRole = user?.role;
  const isLoading = status === "loading";

  const publicMenuItems = [
    { label: "Para Jugadores", href: "/landing-jugadores" },
    { label: "Para Escuelas", href: "/landing-escuelas" },
  ];


  const playerMenuItems = [
    { label: "Inicio", href: "/dashboard" },
    { label: "Explorar Escuelas", href: "para-jugadores" },
    { label: "Suscripciones", href: "/suscripciones-jugadores" },
  ];

  const schoolMenuItems = [
    { label: "Inicio", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Explorar Jugadores", href: "/para-escuelas" },
    { label: "Mis Ofertas", href: "/mis-ofertas" },
    { label: "Suscripciones", href: "/suscripciones-escuelas" },
  ];

  const getMenuItems = () => {
    if (isLoading) return []; // Return empty array while loading
    if (!user) return publicMenuItems;
    if (userRole === "PLAYER") return playerMenuItems;
    if (userRole === "SCHOOL") return schoolMenuItems;
    return publicMenuItems;
  };

  const menuItems = getMenuItems();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary-100 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center">
                <Image
                  src="/logoTopTalent.png"
                  alt="Top Talent Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-primary-700">
                Top Talent
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {isLoading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-4 w-24 animate-pulse rounded bg-gray-200"
                  ></div>
                ))}
              </>
            ) : (
              menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                    pathname === item.href
                      ? "text-primary-600"
                      : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))
            )}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {isLoading ? (
              <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200"></div>
            ) : user ? (
              <UserMenu user={user} />
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileMenu
          menuItems={menuItems}
          user={user}
          pathname={pathname}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};
