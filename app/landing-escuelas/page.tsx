import { HeroSchools } from "@/components/landing/HeroSchools";
import { SchoolComparisonTable, SchoolSubscriptionPlans } from "@/components/subscriptions";

export default function LandingEscuelasPage() {
  return (
    <div>
      <HeroSchools />
      <div className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Planes para Escuelas y Clubes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Encuentra el talento que necesitas con nuestras herramientas profesionales de scouting
            </p>
          </div>

          <SchoolSubscriptionPlans />

          <SchoolComparisonTable />
        </div>
      </div>
    </div>
  );
}
