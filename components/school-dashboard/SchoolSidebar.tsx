"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  User, 
  Settings,
  LogOut,
  School,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";

const menuItems = [
  {
    title: "Perfil",
    href: "/dashboard-escuela/perfil",
    icon: User,
  },
  {
    title: "Estadísticas",
    href: "/dashboard-escuela",
    icon: BarChart3,
  },
  {
    title: "Mis Jugadores",
    href: "/dashboard-escuela/jugadores",
    icon: Users,
  },
  {
    title: "Mis publicaciones",
    href: "/dashboard-escuela/publicaciones",
    icon: FileText,
  }
];

export function SchoolSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="w-64 bg-primary-500 border-r border-primary-600 flex flex-col">
      <div className="p-6 border-b border-primary-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <School className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">Panel Escuela</h2>
            <p className="text-xs text-white/70">Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-primary-100 group",
                isActive
                  ? "bg-primary-100 text-primary-700 hover:bg-primary-100"
                  : "text-white/90 hover:text-primary-700"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform group-hover:scale-110",
                  isActive ? "text-primary-700" : "text-white/70 group-hover:text-primary-700"
                )}
              />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-600">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-white/90 hover:text-primary-700 hover:bg-primary-100"
        >
          <LogOut className="w-5 h-5 text-white/70" />
          <span className="font-medium">Cerrar Sesión</span>
        </Button>
      </div>
    </aside>
  );
}
