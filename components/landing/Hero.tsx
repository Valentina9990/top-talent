"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative bg-gray-900 overflow-hidden min-h-[560px]">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-primary-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-[360px] h-[360px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary-500/20 to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                ¡Muestra tu{" "}
                <span className="bg-gradient-to-r from-blue-400 to-primary-500 bg-clip-text text-transparent">
                  talento
                </span>{" "}
                al mundo!
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                Conecta con escuelas deportivas de élite, muestra tus
                habilidades y abre las puertas a nuevas oportunidades.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {[
                {
                  label: "Visibilidad garantizada",
                  desc: "Tu perfil será visto por cazatalentos y escuelas profesionales",
                },
                {
                  label: "Oportunidades reales",
                  desc: "Recibe ofertas directas de instituciones deportivas",
                },
                {
                  label: "Destaca tu potencial",
                  desc: "Crea un portafolio con videos, estadísticas y logros",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base">
                    <strong className="text-white">{item.label}:</strong>{" "}
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary-500 hover:bg-primary-700 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-200"
                >
                  Explorar oportunidades
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
            </div>

            <div className="pt-5 border-t border-gray-700/60">
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Registro gratuito • Sin comisiones • Privacidad garantizada
              </p>
            </div>
          </div>

          <div className="hidden lg:flex relative items-end justify-center h-[520px]">
            <svg
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[460px] h-[460px] pointer-events-none"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="200" cy="400" r="180" stroke="#073079" strokeWidth="1" strokeDasharray="8 5" opacity="0.4" />
              <circle cx="200" cy="400" r="140" stroke="#073079" strokeWidth="1" opacity="0.25" />
              <circle cx="200" cy="400" r="100" stroke="#2563eb" strokeWidth="0.8" opacity="0.15" />
            </svg>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-primary-500/20 blur-2xl pointer-events-none" />

            <div className="absolute top-6 right-6 w-10 h-10 border-2 border-blue-400/40 rotate-45 pointer-events-none" />
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-blue-400/60 pointer-events-none" />
            <div className="absolute top-20 left-8 w-6 h-6 border border-primary-500/50 rotate-12 pointer-events-none" />
            <div className="absolute top-32 left-4 w-2 h-2 rounded-full bg-primary-500/70 pointer-events-none" />
            <div className="absolute bottom-24 right-8 w-16 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-20 right-8 w-8 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent pointer-events-none" />

            <div className="relative z-10 h-full flex items-end">
              <Image
                src="/hero-player.png"
                alt="Futbolista pateando un balón"
                width={420}
                height={520}
                className="object-contain object-bottom drop-shadow-[0_0_50px_rgba(7,48,121,0.5)]"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
