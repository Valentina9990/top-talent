"use client";

import React from "react";

interface PlayerStatsProps {
  goals: number;
  assists: number;
  matchesPlayed: number;
}

export function PlayerStats({ goals, assists, matchesPlayed }: PlayerStatsProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      <div className="text-center p-4 bg-gray-50 rounded-lg flex-1 min-w-[100px]">
        <p className="text-3xl font-bold text-primary-500">{goals || 0}</p>
        <p className="text-sm text-gray-500">Goles</p>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-lg flex-1 min-w-[100px]">
        <p className="text-3xl font-bold text-primary-500">{assists || 0}</p>
        <p className="text-sm text-gray-500">Asistencias</p>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-lg flex-1 min-w-[100px]">
        <p className="text-3xl font-bold text-primary-500">{matchesPlayed || 0}</p>
        <p className="text-sm text-gray-500">Partidos Jugados</p>
      </div>
    </div>
  );
}
