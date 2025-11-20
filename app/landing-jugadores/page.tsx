import { Hero } from "@/components/landing/Hero";
import { PlayerSubscriptionPlans } from "@/components/subscriptions/player/PlayerSubscriptionPlans";
import { PlayerComparisonTable } from "@/components/subscriptions/player/PlayerComparisonTable";
import { PlayerFAQ } from "@/components/subscriptions/player/PlayerFAQ";

export default function LandingJugadoresPage() {
  return (
    <div>
      <Hero />
      <div className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Planes para Jugadores
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Elige el plan que mejor se adapte a tus necesidades y lleva tu carrera al siguiente nivel
            </p>
          </div>

          <PlayerSubscriptionPlans />

          <PlayerComparisonTable />

        </div>
      </div>
    </div>
  );
}
