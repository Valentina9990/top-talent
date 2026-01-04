"use client";

import React, { useState, useTransition } from "react";
import { User } from "@prisma/client";
import { PlayerProfile, Position } from "@/types/player-profile";
import PlayerCard from "@/components/PlayerCard";
import { searchPlayers } from "@/actions/search-players";

interface FeedClientProps {
  initialPlayers: (User & { playerProfile: PlayerProfile | null })[];
  positions: Position[];
}

const FeedClient: React.FC<FeedClientProps> = ({ initialPlayers, positions }) => {
  const [players, setPlayers] = useState(initialPlayers);
  const [isPending, startTransition] = useTransition();
  
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [ageRange, setAgeRange] = useState("");

  const handleFilter = () => {
    startTransition(async () => {
      const result = await searchPlayers({
        name: name || undefined,
        position: position || undefined,
        ageRange: ageRange || undefined,
      });

      if (result.success && result.players) {
        setPlayers(result.players);
      }
    });
  };

  const handleReset = () => {
    setName("");
    setPosition("");
    setAgeRange("");
    startTransition(async () => {
      const result = await searchPlayers({});
      if (result.success && result.players) {
        setPlayers(result.players);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Muro de Talentos
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Explora los perfiles de los deportistas más prometedores de la región. 
          Filtra y encuentra el talento que buscas.
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md mb-8 sticky top-20 z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFilter();
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition duration-300"
          />
          
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition duration-300"
          >
            <option value="">Todas las Posiciones</option>
            {positions.map((pos) => (
              <option key={pos.id} value={pos.name}>
                {pos.name}
              </option>
            ))}
          </select>

          <select
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition duration-300"
          >
            <option value="">Cualquier Edad</option>
            <option value="15-16 años">15-16 años</option>
            <option value="17-18 años">17-18 años</option>
            <option value="+18 años">+18 años</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={handleFilter}
              disabled={isPending}
              className="flex-1 bg-primary-500 text-white font-semibold py-2 rounded-lg hover:bg-primary-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Filtrando..." : "Filtrar"}
            </button>
            <button
              onClick={handleReset}
              disabled={isPending}
              className="px-4 bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {isPending ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Cargando jugadores...</p>
        </div>
      ) : players.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No se encontraron jugadores con los filtros aplicados.
          </p>
          <button
            onClick={handleReset}
            className="mt-4 text-primary-500 hover:text-primary-700 font-semibold"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedClient;

