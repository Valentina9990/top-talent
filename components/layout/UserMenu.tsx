"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { UserAvatar } from "./UserAvatar";
import { ChevronDown, User, LogOut, Settings, FileText } from "lucide-react";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "ADMIN" | "PLAYER" | "SCHOOL";
  };
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const getMenuOptions = () => {
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
          label: "Mi CV Deportivo",
          href: "/cv-deportivo",
          icon: FileText,
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

  const menuOptions = getMenuOptions();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-lg p-2 hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <UserAvatar name={user.name} image={user.image} />
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-gray-900">
            {user.name || "Usuario"}
          </p>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg border border-gray-200 focus:outline-none">
          <div className="py-1">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">
                {user.name || "Usuario"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>

            <div className="py-1">
              {menuOptions.map((option) => (
                <Link
                  key={option.href}
                  href={option.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <option.icon className="mr-3 h-4 w-4 text-gray-500" />
                  {option.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-200 py-1">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
