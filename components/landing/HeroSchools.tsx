"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSchools() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          <div className="space-y-4 lg:space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                ¡Encuentra el{" "}
                <span className="text-primary-600 bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                  talento
                </span>{" "}
                que buscas!
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Promociona tu escuela deportiva, conecta con jugadores
                talentosos, publica convocatorias y haz crecer tu institución.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Mayor visibilidad:</strong>{" "}
                  Dale difusión a tu escuela y atrae a los mejores talentos
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">
                    Publicaciones ilimitadas:
                  </strong>{" "}
                  Anuncia convocatorias, partidos, eventos y noticias de tu
                  escuela
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Gestión completa:</strong>{" "}
                  Administra tu perfil, jugadores y contenido desde un solo
                  lugar
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Registrar mi escuela
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              </Link>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Registro gratuito • Sin comisiones • Gestión profesional
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="order-1 lg:order-2">
              <div className="relative aspect-square lg:aspect-[3/4] max-w-md mx-auto">
                <Image
                  src="/schools.png"
                  alt="Escuela deportiva profesional"
                  fill
                  className="object-cover rounded-lg"
                  priority
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-100 rounded-full blur-3xl opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-100 rounded-full blur-3xl opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}
