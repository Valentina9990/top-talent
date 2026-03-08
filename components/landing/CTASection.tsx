"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative py-16 md:py-24 bg-gray-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="cta-dots" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-dots)" />
      </svg>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            ¿Listo para dar el{" "}
            <span className="bg-gradient-to-r from-blue-400 to-primary-500 bg-clip-text text-transparent">
              siguiente paso
            </span>
            ?
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Únete a la comunidad de TopTalent y conecta con las mejores oportunidades
            del deporte. Tu futuro empieza aquí.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary-500 hover:bg-primary-700 text-white px-10 py-6 text-lg font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-200"
              >
                Crear cuenta gratis
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-gray-500 text-white hover:bg-white/10 px-10 py-6 text-lg font-semibold transition-all duration-200"
              >
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
