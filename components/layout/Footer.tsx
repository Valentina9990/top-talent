import Link from "next/link";
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
    <footer className="bg-primary-700 text-primary-50">
      <div className="container mx-auto px-6 py-12 lg:px-20">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                Pegasight
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-primary-50/80">
              Conectamos jugadores con escuelas deportivas y ofrecemos grabación
              deportiva profesional para llevar tu rendimiento al siguiente nivel.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Plataforma
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-50/70 transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Contacto
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2 text-sm text-primary-50/70 transition-colors hover:text-secondary"
                >
                  <Mail size={16} className="shrink-0" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-2 text-sm text-primary-50/70 transition-colors hover:text-secondary"
                >
                  <Phone size={16} className="shrink-0" />
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary-50/70 transition-colors hover:text-secondary"
                >
                  <Instagram size={16} className="shrink-0" />
                  {CONTACT_INFO.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-50/10 pt-8 text-center text-xs text-primary-50/50">
          © {currentYear} Pegasight. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
