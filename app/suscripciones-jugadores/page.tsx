import { PlayerSubscriptionPlans } from "@/components/subscriptions/player/PlayerSubscriptionPlans";
import { PlayerComparisonTable } from "@/components/subscriptions/player/PlayerComparisonTable";
import { PlayerFAQ } from "@/components/subscriptions/player/PlayerFAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planes de Suscripción para Jugadores | Pegasight",
  description: "Elige el plan perfecto para impulsar tu carrera futbolística. Desde planes gratuitos hasta premium con visibilidad destacada.",
};

export default function SuscripcionesJugadoresPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Planes para Jugadores
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Elige el plan que mejor se adapte a tus necesidades y lleva tu carrera al siguiente nivel
          </p>
        </div>

        <PlayerSubscriptionPlans />

        <PlayerComparisonTable />

        <PlayerFAQ />

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ¿Tienes preguntas?
          </h2>
          <p className="text-gray-600 mb-8">
            Contáctanos y te ayudaremos a elegir el mejor plan para ti
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-6 py-3 text-base font-medium text-white hover:bg-primary-700 transition-colors"
          >
            Contactar Soporte
          </a>
        </div>
      </div>
    </div>
  );
}
