"use client";

import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

const comparisonData = [
  {
    category: "Perfil y Branding",
    features: [
      {
        name: "Perfil institucional completo",
        premium: true,
        institutional: true,
      },
      {
        name: "Branding personalizado en la plataforma",
        premium: false,
        institutional: true,
      },
      {
        name: "Logo y colores institucionales",
        premium: true,
        institutional: true,
      },
    ],
  },
  {
    category: "Convocatorias",
    features: [
      {
        name: "Convocatorias activas simultáneas",
        premium: "Hasta 5",
        institutional: "Ilimitadas",
      },
      {
        name: "Publicación de convocatorias",
        premium: true,
        institutional: true,
      },
      {
        name: "Gestión de postulaciones",
        premium: true,
        institutional: true,
      },
    ],
  },
  {
    category: "Base de Datos y Búsqueda",
    features: [
      {
        name: "Acceso a base de datos de jugadores",
        premium: "Ilimitado",
        institutional: "Ilimitado",
      },
      {
        name: "Filtros avanzados (edad, posición, stats)",
        premium: true,
        institutional: true,
      },
      {
        name: "Dashboard global de estadísticas regionales",
        premium: false,
        institutional: true,
      },
      {
        name: "Informes de scouting segmentados",
        premium: false,
        institutional: true,
      },
    ],
  },
  {
    category: "Comunicación",
    features: [
      {
        name: "Mensajería interna con jugadores",
        premium: true,
        institutional: true,
      },
      {
        name: "Comunicación con otros clubes/instituciones",
        premium: false,
        institutional: true,
      },
    ],
  },
  {
    category: "Reportes y Análisis",
    features: [
      {
        name: "Reportes de postulaciones",
        premium: "Básico",
        institutional: "Avanzado",
      },
      {
        name: "Análisis de candidatos",
        premium: "Básico",
        institutional: "Completo",
      },
      {
        name: "Informes por categorías (Sub-15, Sub-17, Sub-20)",
        premium: false,
        institutional: true,
      },
    ],
  },
  {
    category: "Gestión y Soporte",
    features: [
      {
        name: "Gestión de múltiples clubes",
        premium: false,
        institutional: true,
      },
      {
        name: "API de integración",
        premium: false,
        institutional: true,
      },
      {
        name: "Gestor de cuenta dedicado",
        premium: false,
        institutional: true,
      },
      {
        name: "Soporte prioritario",
        premium: "Estándar",
        institutional: "Prioritario",
      },
    ],
  },
];

export function SchoolComparisonTable() {
  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-red-400 mx-auto" />
      );
    }
    return <span className="text-sm text-gray-700">{value}</span>;
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Comparación Detallada de Planes
      </h2>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Características
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-primary-700 bg-primary-50">
                  Club Premium
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Plan Institucional
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((category) => (
                <>
                  <tr key={category.category} className="bg-gray-100">
                    <td
                      colSpan={3}
                      className="px-6 py-3 text-sm font-bold text-gray-900"
                    >
                      {category.category}
                    </td>
                  </tr>
                  {category.features.map((feature, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {feature.name}
                      </td>
                      <td className="px-6 py-4 text-center bg-primary-50">
                        {renderCell(feature.premium)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderCell(feature.institutional)}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          * El Plan Institucional tiene un precio variable según el alcance y necesidades específicas.
          <br />
          Contacta con nuestro equipo de ventas para una cotización personalizada.
        </p>
      </div>
    </div>
  );
}
