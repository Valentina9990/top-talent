"use client";

import { Button } from "@/components/ui/button";

export function UnifiedHero() {
  return (
    <section className="relative bg-gray-900 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-dots" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>

      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-primary-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-[360px] h-[360px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
            Conectamos{" "}
            <span className="text-blue-400">
              talento
            </span>{" "}
            con{" "}
            <span className="text-blue-400">
              oportunidades
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            TopTalent conecta a jugadores que muestran su talento, escuelas que organizan y dan visibilidad a sus
            planteles y scouts que buscan y analizan perfiles con datos reales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="#para-jugadores">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary-500 hover:bg-primary-700 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-200"
              >
                Soy Jugador
              </Button>
            </a>
            <a href="#para-escuelas">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-gray-500 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold transition-all duration-200"
              >
                Soy Escuela
              </Button>
            </a>
            <a href="#para-scouts">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-gray-500 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold transition-all duration-200"
              >
                Soy Scout
              </Button>
            </a>
          </div>

          <div className="pt-6">
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Registro gratuito · Sin comisiones · Privacidad garantizada
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
