"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { UserAvatar } from "./UserAvatar";
import {
  User,
  LogOut,
  Settings,
  FileText,
  LayoutDashboard,
} from "lucide-react";

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

  const getRoleBadge = () => {
    if (!user) return null;
    if (user.role === "PLAYER") {
      return {
        label: "Jugador",
        bg: "bg-primary-50",
        text: "text-primary-700",
      };
    }
    if (user.role === "SCHOOL") {
      return {
        label: "Escuela",
        bg: "bg-primary-50",
        text: "text-primary-700",
      };
    }
    return null;
  };

  const activeStyles = {
    activeBg: "bg-primary-50",
    activeText: "text-primary-500",
    hoverText: "hover:text-primary-500",
  };

  const getUserMenuOptions = () => {
    if (!user) return [];

    if (user.role === "PLAYER") {
      return [
        {
          label: "Mi Panel",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          label: "Ver Perfil",
          href: "/perfil",
          icon: User,
        },
        {
          label: "Configuración",
          href: "/configuracion",
          icon: Settings,
        },
      ];
    }

    if (user.role === "SCHOOL") {
      return [
        {
          label: "Mi Panel",
          href: "/dashboard-escuela",
          icon: LayoutDashboard,
        },
        {
          label: "Perfil de Escuela",
          href: "/dashboard-escuela/perfil",
          icon: FileText,
        },
        {
          label: "Configuración",
          href: "/dashboard-escuela/configuracion",
          icon: Settings,
        },
      ];
    }

    return [
      {
        label: "Ver Perfil",
        href: "/perfil",
        icon: User,
      },
    ];
  };

  const userMenuOptions = getUserMenuOptions();
  const roleBadge = getRoleBadge();

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
                  ? `${activeStyles.activeBg} ${activeStyles.activeText}`
                  : `text-gray-700 hover:bg-gray-100 ${activeStyles.hoverText}`
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
                {roleBadge && (
                  <span
                    className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${roleBadge.bg} ${roleBadge.text}`}
                  >
                    {roleBadge.label}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-gray-200">
              {userMenuOptions.map((option) => (
                <Link
                  key={option.href}
                  href={option.href}
                  onClick={onClose}
                  className={`flex items-center rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 ${activeStyles.hoverText} transition-colors`}
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
              className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-500 transition-colors text-center"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/register"
              onClick={onClose}
              className="block rounded-lg bg-primary-500 px-3 py-2 text-base font-medium text-white hover:bg-primary-700 transition-colors text-center"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
