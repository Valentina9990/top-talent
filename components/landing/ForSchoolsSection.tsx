"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const SCHOOL_FEATURES = [
  {
    title: "Mayor visibilidad",
    description: "Dale difusión a tu escuela y atrae a los mejores talentos deportivos de tu región.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Publicaciones",
    description: "Anuncia convocatorias, partidos, eventos y noticias de tu escuela.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    title: "Gestión completa",
    description: "Administra tu perfil, jugadores y contenido desde un solo lugar de forma profesional.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export function ForSchoolsSection() {
  return (
    <section id="para-escuelas" className="py-16 md:py-24 bg-gray-50 scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Visual card */}
          <div className="relative order-2 lg:order-1">
            <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-primary-50 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Panel de Escuela</p>
                    <p className="text-gray-500 text-sm">Dashboard profesional</p>
                  </div>
                </div>

                {/* Mock dashboard stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Jugadores", value: "128", trend: "+12%" },
                    { label: "Convocatorias", value: "15", trend: "+3" },
                    { label: "Visitas", value: "1.2K", trend: "+18%" },
                    { label: "Aplicaciones", value: "45", trend: "+8" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <div className="flex items-end gap-2 mt-1">
                        <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                        <span className="text-xs font-medium text-green-600 mb-0.5">{stat.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mock recent activity */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Actividad reciente</p>
                  {[
                    { text: "Nuevo jugador interesado en tu convocatoria", time: "Hace 2h" },
                    { text: "Tu publicación tiene 200 interacciones", time: "Hace 5h" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-3 bg-primary-50/50 rounded-lg px-4 py-3">
                      <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                      <p className="text-sm text-gray-700 flex-1">{activity.text}</p>
                      <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary-500">
                Para Escuelas
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Encuentra el{" "}
                <span className="text-primary-500">talento</span>{" "}
                que buscas
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Promociona tu escuela deportiva, conecta con jugadores
                talentosos, publica convocatorias y haz crecer tu institución.
              </p>
            </div>

            <div className="space-y-5">
              {SCHOOL_FEATURES.map((feature) => (
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
                  Registrar mi escuela
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
