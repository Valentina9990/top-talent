"use client";

import React from "react";
import { PlayerProfileFormData } from "@/types/player-profile";

interface StatisticsFormProps {
  formData: PlayerProfileFormData;
  validationErrors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function StatisticsForm({
  formData,
  validationErrors,
  onChange,
}: StatisticsFormProps) {
  return (
    <div className="border-b pb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Estadísticas</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Goles
          </label>
          <input
            type="number"
            name="goals"
            value={formData.goals || 0}
            onChange={onChange}
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              validationErrors.goals ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.goals && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.goals}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Asistencias
          </label>
          <input
            type="number"
            name="assists"
            value={formData.assists || 0}
            onChange={onChange}
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              validationErrors.assists ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.assists && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.assists}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Partidos Jugados
          </label>
          <input
            type="number"
            name="matchesPlayed"
            value={formData.matchesPlayed || 0}
            onChange={onChange}
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              validationErrors.matchesPlayed ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.matchesPlayed && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.matchesPlayed}</p>
          )}
        </div>
      </div>
    </div>
  );
}

