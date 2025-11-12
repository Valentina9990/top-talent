"use client";

import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

const comparisonData = [
  {
    category: "Perfil",
    features: [
      {
        name: "Datos personales básicos",
        free: true,
        basic: true,
        premium: true,
      },
      {
        name: "Estadísticas básicas",
        free: false,
        basic: true,
        premium: true,
      },
      {
        name: "Estadísticas avanzadas",
        free: false,
        basic: false,
        premium: true,
      },
      {
        name: "Trayectoria completa",
        free: false,
        basic: false,
        premium: true,
      },
      {
        name: "Certificaciones",
        free: false,
        basic: false,
        premium: true,
      },
    ],
  },
  {
    category: "Videos",
    features: [
      {
        name: "Videos permitidos",
        free: "1 video (2 min)",
        basic: "3 videos (3 min c/u)",
        premium: "7 videos (5 min c/u)",
      },
      {
        name: "Alta calidad",
        free: false,
        basic: false,
        premium: true,
      },
    ],
  },
  {
    category: "Oportunidades",
    features: [
      {
        name: "Convocatorias abiertas",
        free: false,
        basic: true,
        premium: true,
      },
      {
        name: "Postulaciones mensuales",
        free: "0",
        basic: "5",
        premium: "Ilimitadas",
      },
      {
        name: "Visibilidad destacada",
        free: false,
        basic: false,
        premium: true,
      },
    ],
  },
  {
    category: "Reportes y Análisis",
    features: [
      {
        name: "Reportes de visualizaciones",
        free: false,
        basic: "Básicos",
        premium: "Detallados",
      },
      {
        name: "Análisis de interacciones",
        free: false,
        basic: false,
        premium: true,
      },
      {
        name: "Comparador de rendimiento",
        free: false,
        basic: false,
        premium: true,
      },
      {
        name: "Recomendaciones automáticas",
        free: false,
        basic: false,
        premium: true,
      },
    ],
  },
];

export function ComparisonTable() {
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
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Gratuito
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Básico
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-primary-700 bg-primary-50">
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((category) => (
                <>
                  <tr key={category.category} className="bg-gray-100">
                    <td
                      colSpan={4}
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
                      <td className="px-6 py-4 text-center">
                        {renderCell(feature.free)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderCell(feature.basic)}
                      </td>
                      <td className="px-6 py-4 text-center bg-primary-50">
                        {renderCell(feature.premium)}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
