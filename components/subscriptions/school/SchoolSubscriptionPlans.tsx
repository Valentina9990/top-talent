import { SchoolPricingCard } from "./SchoolPricingCard";

const plans = [
  {
    name: "Club Premium",
    price: 100000,
    period: "mes",
    description: "Perfecto para clubes y escuelas que buscan talento constantemente",
    features: [
      "Perfil institucional del club/escuela",
      "Publicación de hasta 5 convocatorias activas",
      "Filtros avanzados (edad, posición, estadísticas, rendimiento)",
      "Acceso ilimitado a la base de datos de jugadores",
      "Comunicación directa con jugadores (mensajería interna)",
      "Reportes de postulaciones y análisis básico de candidatos",
    ],
    limitations: [
      "Hasta 5 convocatorias activas al mismo tiempo",
    ],
    highlighted: true,
    ctaText: "Comenzar Ahora",
    ctaVariant: "default" as const,
    badge: "Más Popular",
  },
  {
    name: "Plan Institucional",
    price: "$250.000 - $500.000",
    period: "mes",
    description: "Solución completa para ligas, asociaciones y alcaldías",
    features: [
      "Espacio para ligas, asociaciones o alcaldías",
      "Dashboard global con estadísticas de jugadores de toda la región",
      "Informes de scouting segmentados (categorías Sub-15, Sub-17, Sub-20)",
      "Branding institucional dentro de la plataforma",
      "Todas las características del Plan Club Premium",
      "Gestión de múltiples clubes bajo una organización",
      "API de integración con sistemas propios",
      "Soporte prioritario y gestor de cuenta dedicado",
    ],
    limitations: [],
    highlighted: false,
    ctaText: "Contactar Ventas",
    ctaVariant: "outline" as const,
    badge: "Próximamente",
  },
];

export function SchoolSubscriptionPlans() {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-8 max-w-5xl mx-auto">
      {plans.map((plan) => (
        <SchoolPricingCard key={plan.name} {...plan} />
      ))}
    </div>
  );
}
