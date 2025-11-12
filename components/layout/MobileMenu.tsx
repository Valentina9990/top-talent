"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { UserAvatar } from "./UserAvatar";
import { User, LogOut, Settings, FileText } from "lucide-react";

interface MobileMenuProps {
  menuItems: Array<{
    label: string;
    href: string;
  }>;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "ADMIN" | "PLAYER" | "SCHOOL";
  } | null;
  pathname: string | null;
  onClose: () => void;
}

export const MobileMenu = ({
  menuItems,
  user,
  pathname,
  onClose,
}: MobileMenuProps) => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };


  const getUserMenuOptions = () => {
    if (!user) return [];

    const commonOptions = [
      {
        label: "Ver Perfil",
        href: "/perfil",
        icon: User,
      },
    ];

    if (user.role === "PLAYER") {
      return [
        ...commonOptions,
        {
          label: "Configuración",
          href: "/configuracion",
          icon: Settings,
        },
      ];
    }

    if (user.role === "SCHOOL") {
      return [
        ...commonOptions,
        {
          label: "Perfil de Escuela",
          href: "/escuela/perfil",
          icon: FileText,
        },
        {
          label: "Configuración",
          href: "/configuracion",
          icon: Settings,
        },
      ];
    }

    return commonOptions;
  };

  const userMenuOptions = getUserMenuOptions();

  return (
    <div className="md:hidden">
      <div className="space-y-1 px-4 pb-3 pt-2 border-t border-gray-200">
        <div className="space-y-1 pb-3 border-b border-gray-200">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                pathname === item.href
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {user ? (
          <div className="pt-4 pb-3 space-y-3">
            <div className="flex items-center px-3">
              <UserAvatar name={user.name} image={user.image} size="lg" />
              <div className="ml-3">
                <p className="text-base font-medium text-gray-900">
                  {user.name || "Usuario"}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-gray-200">
              {userMenuOptions.map((option) => (
                <Link
                  key={option.href}
                  href={option.href}
                  onClick={onClose}
                  className="flex items-center rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                >
                  <option.icon className="mr-3 h-5 w-5 text-gray-500" />
                  {option.label}
                </Link>
              ))}

              <button
                onClick={handleSignOut}
                className="flex w-full items-center rounded-lg px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4 space-y-2">
            <Link
              href="/auth/login"
              onClick={onClose}
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors text-center"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/register"
              onClick={onClose}
              className="block rounded-lg bg-blue-600 px-3 py-2 text-base font-medium text-white hover:bg-blue-700 transition-colors text-center"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
