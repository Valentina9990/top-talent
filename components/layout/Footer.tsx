import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Instagram } from "lucide-react";

const CONTACT_INFO = {
  email: "soporte@pegasight.com",
  phone: "+573226029105",
  phoneDisplay: "+57 322 602 9105",
  instagram: {
    handle: "@pegasight_sports",
    url: "https://www.instagram.com/pegasight_sports",
  },
} as const;

const NAV_LINKS = [
  { label: "Para Jugadores", href: "/landing-jugadores" },
  { label: "Para Escuelas", href: "/landing-escuelas" },
  { label: "Suscripciones Jugadores", href: "/suscripciones-jugadores" },
  { label: "Suscripciones Escuelas", href: "/suscripciones-escuelas" },
] as const;

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-700 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Pegasight logo"
                width={36}
                height={36}
                className="rounded"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-xl font-bold tracking-tight">Pegasight</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/70">
              Conectamos jugadores con escuelas deportivas y ofrecemos grabación
              deportiva profesional para llevar tu rendimiento al siguiente nivel.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
              Plataforma
            </h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
              Contacto
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail size={15} className="shrink-0" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone size={15} className="shrink-0" />
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Instagram size={15} className="shrink-0" />
                  {CONTACT_INFO.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {currentYear} Pegasight. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
