
import { SchoolComparisonTable, SchoolSubscriptionPlans } from "@/components/subscriptions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planes de Suscripción para Escuelas y Clubes | TopTalent",
  description: "Accede a la mejor base de datos de jugadores. Planes diseñados para clubes, escuelas y organizaciones deportivas.",
};

export default function SuscripcionesEscuelasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Planes para Escuelas y Clubes
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Encuentra el talento que necesitas con nuestras herramientas profesionales de scouting
          </p>
        </div>

        <SchoolSubscriptionPlans />

        <SchoolComparisonTable />

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ¿Necesitas un plan personalizado?
          </h2>
          <p className="text-gray-600 mb-8">
            Contacta con nuestro equipo de ventas para planes empresariales y soluciones a medida
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-6 py-3 text-base font-medium text-white hover:bg-primary-700 transition-colors"
          >
            Contactar Ventas
          </a>
        </div>
      </div>
    </div>
  );
}
