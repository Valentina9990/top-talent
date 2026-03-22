"use client";

const STEPS = [
  {
    step: "01",
    title: "Regístrate gratis",
    description: "Crea tu cuenta como jugador, escuela o scout en menos de 2 minutos.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Completa tu perfil",
    description: "Agrega tu información, videos, estadísticas o datos de tu rol (jugador, escuela o scout).",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Conecta y crece",
    description: "Descubre oportunidades, recibe ofertas y lleva tu carrera o institución al siguiente nivel.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export function HowItWorksSection() {
  return (
    <section className="pt-6 pb-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary-500">
            ¿Cómo funciona?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Comienza en 3 simples pasos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ya seas jugador, escuela o scout, el proceso es rápido y sencillo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {STEPS.map((step, index) => (
            <div key={step.step} className="relative text-center group">
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary-500/30 to-primary-500/10 pointer-events-none" />
              )}

              <div className="relative z-10 space-y-4">
                <div className="mx-auto w-24 h-24 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  {step.icon}
                </div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-500">
                  Paso {step.step}
                </span>
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
