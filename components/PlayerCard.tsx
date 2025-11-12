"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "@prisma/client";
import { PlayerProfile } from "@/types/player-profile";

interface PlayerCardProps {
  player: User & {
    playerProfile: PlayerProfile | null;
  };
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const profile = player.playerProfile;

  if (!profile) return null;

  const avatarUrl = player.image;
  const positions = profile.positions.map((p) => p.name).join(", ");
  const age = profile.category?.name || "N/A";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-primary-500 to-primary-600">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={player.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl font-bold text-white/30">
              {player.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{player.name}</h3>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          {profile.team && (
            <div className="flex items-center">
              <span className="font-semibold mr-2">Equipo:</span>
              <span>{profile.team}</span>
            </div>
          )}

          {positions && (
            <div className="flex items-center">
              <span className="font-semibold mr-2">Posición:</span>
              <span>{positions}</span>
            </div>
          )}

          <div className="flex items-center">
            <span className="font-semibold mr-2">Categoría:</span>
            <span>{age}</span>
          </div>

          {profile.zone && (
            <div className="flex items-center">
              <span className="font-semibold mr-2">Zona:</span>
              <span>{profile.zone}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center text-sm mb-4 py-3 border-t border-gray-200">
          <div className="text-center">
            <div className="font-bold text-gray-900">{profile.goals}</div>
            <div className="text-gray-600">Goles</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-900">{profile.assists}</div>
            <div className="text-gray-600">Asistencias</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-900">{profile.matchesPlayed}</div>
            <div className="text-gray-600">Partidos</div>
          </div>
        </div>

        <Link
          href={`/jugador/${player.id}`}
          className="block w-full text-center bg-primary-600 text-white font-semibold py-2 rounded-lg hover:bg-primary-700 transition duration-300"
        >
          Ver Perfil
        </Link>
      </div>
    </div>
  );
}

