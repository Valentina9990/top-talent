import { PricingCard } from "./PricingCard";

const plans = [
  {
    name: "Gratuito",
    price: 0,
    period: "",
    description: "Ideal para comenzar y crear tu perfil básico",
    features: [
      "Perfil básico (datos personales, posición, edad, foto)",
      "Subida de 1 video corto (máx. 2 min)",
    ],
    limitations: [
      "Sin acceso a convocatorias ni postulaciones",
      "No aparece en búsquedas destacadas",
      "Sin estadísticas ni reportes",
    ],
    highlighted: false,
    ctaText: "Comenzar Gratis",
    ctaVariant: "outline" as const,
  },
  {
    name: "Básico",
    price: 15000,
    period: "mes",
    description: "Para jugadores que buscan oportunidades activamente",
    features: [
      "Perfil con datos + estadísticas básicas",
      "Estadísticas: partidos jugados, posición, goles",
      "Subida de hasta 3 videos (máx. 3 min c/u)",
      "Acceso a convocatorias abiertas",
      "Hasta 5 postulaciones al mes",
    ],
    limitations: [
      "Sin visibilidad destacada",
      "Reportes básicos de visualizaciones (limitados)",
    ],
    highlighted: false,
    ctaText: "Suscribirse",
    ctaVariant: "default" as const,
  },
  {
    name: "Premium",
    price: 25000,
    period: "mes",
    description: "Máxima visibilidad y herramientas profesionales",
    features: [
      "Perfil completo con estadísticas avanzadas",
      "Trayectoria completa y certificaciones",
      "Subida de hasta 7 videos en alta calidad (máx. 5 min c/u)",
      "Postulaciones ilimitadas",
      "Visibilidad destacada en el buscador de clubes",
      "Reporte detallado de visualizaciones e interacciones",
      "Acceso prioritario a nuevas funciones",
      "Comparador de rendimiento",
      "Recomendaciones automáticas de clubes",
    ],
    limitations: [],
    highlighted: true,
    ctaText: "Suscribirse Ahora",
    ctaVariant: "default" as const,
  },
];

export function SubscriptionPlans() {
  return (
    <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
      {plans.map((plan) => (
        <PricingCard key={plan.name} {...plan} />
      ))}
    </div>
  );
}
