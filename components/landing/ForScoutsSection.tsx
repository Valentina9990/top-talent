"use client";

import Link from "next/link";
import { Search, FileText, ListTodo, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SCOUT_FEATURES = [
  {
    title: "Búsqueda avanzada de jugadores",
    description: "Filtra por posición, categoría, ubicación, pie hábil y mucho más en segundos.",
    icon: <Search className="w-6 h-6" />,
  },
  {
    title: "Perfiles con datos reales",
    description: "Accede a videos, estadísticas y antecedentes gestionados por jugadores y escuelas.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Listas de seguimiento",
    description: "Guarda jugadores en listas, toma notas y sigue su evolución temporada a temporada.",
    icon: <ListTodo className="w-6 h-6" />,
  },
];

export function ForScoutsSection() {
  return (
    <section id="para-scouts" className="py-16 md:py-24 bg-white scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary-500">
                Para Scouts
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Encuentra talento real
                <span className="text-primary-500"> con datos reales</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Centraliza tu búsqueda de talento en una sola plataforma, con perfiles completos, videos,
                estadísticas y contexto deportivo para tomar mejores decisiones en menos tiempo.
              </p>
            </div>

            <div className="space-y-5">
              {SCOUT_FEATURES.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-700 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-200"
                >
                  Quiero ser Scout en TopTalent
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-gray-900 to-primary-700 rounded-2xl p-8 md:p-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-semibold">Lista de seguimiento</p>
                    <p className="text-gray-400 text-sm">Jugadores guardados (ejemplo)</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-100">
                    24 jugadores
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    "Delanteros U17 - Región Caribe",
                    "Centrales zurdos - Bogotá",
                    "Extremos con velocidad destacada",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3">
                      <div className="w-2 h-2 rounded-full bg-primary-400 flex-shrink-0" />
                      <p className="text-gray-100 text-sm flex-1 truncate">{item}</p>
                      <span className="text-[11px] text-gray-400 flex-shrink-0">Lista</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-400">
                  Visualización ilustrativa. Como scout tendrás acceso a herramientas para buscar, filtrar y hacer
                  seguimiento de jugadores reales dentro de la plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
