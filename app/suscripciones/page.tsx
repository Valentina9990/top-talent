"use client";

import { useState } from "react";
import { PlayerSubscriptionPlans } from "@/components/subscriptions/player/PlayerSubscriptionPlans";
import { PlayerComparisonTable } from "@/components/subscriptions/player/PlayerComparisonTable";
import { SchoolSubscriptionPlans, SchoolComparisonTable } from "@/components/subscriptions";

type Tab = "jugadores" | "escuelas";

export default function SuscripcionesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("jugadores");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Planes de Suscripción
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("jugadores")}
              className={`rounded-md px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === "jugadores"
                  ? "bg-primary-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Para Jugadores
            </button>
            <button
              onClick={() => setActiveTab("escuelas")}
              className={`rounded-md px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === "escuelas"
                  ? "bg-primary-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Para Escuelas
            </button>
          </div>
        </div>

        {activeTab === "jugadores" ? (
          <div>
            <PlayerSubscriptionPlans />
            <PlayerComparisonTable />
          </div>
        ) : (
          <div>
            <SchoolSubscriptionPlans />
            <SchoolComparisonTable />
          </div>
        )}
      </div>
    </div>
  );
}
