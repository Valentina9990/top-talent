"use client";

import React, { useState } from "react";
import Link from "next/link";
import { deletePlayerVideo, deletePlayerAchievement } from "@/actions/player-profile";
import { useRouter } from "next/navigation";

interface ProfileViewProps {
  profile: any;
  user: any;
  isOwner: boolean;
}

export default function ProfileView({ profile, user, isOwner }: ProfileViewProps) {
  const router = useRouter();
  const [deletingVideo, setDeletingVideo] = useState<string | null>(null);
  const [deletingAchievement, setDeletingAchievement] = useState<string | null>(null);

  const handleDeleteVideo = async (videoId: string) => {
    if (!confirm("¿Estás seguro de eliminar este video?")) return;

    setDeletingVideo(videoId);
    const result = await deletePlayerVideo(videoId);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setDeletingVideo(null);
  };

  const handleDeleteAchievement = async (achievementId: string) => {
    if (!confirm("¿Estás seguro de eliminar este logro?")) return;

    setDeletingAchievement(achievementId);
    const result = await deletePlayerAchievement(achievementId);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setDeletingAchievement(null);
  };

  const avatarUrl = profile?.avatarUrl || user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Player")}`;

  return (
    <>
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-64"
              src={avatarUrl}
              alt={user?.name || "Player"}
            />
          </div>
          <div className="p-8 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="uppercase tracking-wide text-sm text-primary-600 font-semibold flex flex-wrap gap-2">
                  {profile?.positions && profile.positions.length > 0 ? (
                    profile.positions.map((pos: { id: string; name: string }) => (
                      <span key={pos.id} className="bg-primary-100 px-2 py-1 rounded">
                        {pos.name}
                      </span>
                    ))
                  ) : profile?.position?.name ? (
                    <span>{profile.position.name}</span>
                  ) : (
                    <span>Sin posición</span>
                  )}
                </div>
                <h1 className="mt-1 text-4xl font-bold text-gray-900">{user?.name || "Jugador"}</h1>
                <p className="mt-2 text-gray-600">
                  {profile?.team || "Sin equipo"} {profile?.zone && `• ${profile.zone}`}
                </p>
                {profile?.preferredFoot && (
                  <p className="mt-1 text-sm text-gray-500">
                    Pierna: {profile.preferredFoot === "RIGHT" ? "Derecha" : profile.preferredFoot === "LEFT" ? "Izquierda" : "Ambas"}
                  </p>
                )}
                {profile?.category && (
                  <p className="mt-1 text-sm text-gray-500">
                    Categoría: {profile.category.name}
                  </p>
                )}
                {profile?.bio && (
                  <p className="mt-4 text-gray-700">{profile.bio}</p>
                )}
              </div>
              {isOwner && (
                <Link
                  href="/perfil?edit=true"
                  className="bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition duration-300"
                >
                  Editar Perfil
                </Link>
              )}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg flex-1 min-w-[100px]">
                <p className="text-3xl font-bold text-primary-600">{profile?.goals || 0}</p>
                <p className="text-sm text-gray-500">Goles</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg flex-1 min-w-[100px]">
                <p className="text-3xl font-bold text-primary-600">{profile?.assists || 0}</p>
                <p className="text-sm text-gray-500">Asistencias</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg flex-1 min-w-[100px]">
                <p className="text-3xl font-bold text-primary-600">{profile?.matchesPlayed || 0}</p>
                <p className="text-sm text-gray-500">Partidos Jugados</p>
              </div>
            </div>
            {!isOwner && (
              <button className="mt-8 bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition duration-300">
                Contactar Jugador
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Highlights */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Video de Presentación y Highlights</h2>

            {profile?.profileVideoUrl ? (
              <div className="rounded-xl overflow-hidden shadow-lg mb-8 bg-black">
              <video
                controls
                src={profile.profileVideoUrl}
                className="w-full h-auto"
                poster={avatarUrl}
              >
                Tu navegador no soporta el tag de video.
              </video>
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden shadow-lg mb-8 bg-gray-200 flex items-center justify-center h-64">
              <p className="text-gray-500">No hay video de presentación</p>
            </div>
          )}

          {profile?.videos && profile.videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.videos.map((video: any) => (
                <div key={video.id} className="relative group">
                  <div className="rounded-lg overflow-hidden shadow-md bg-black">
                    <video
                      controls
                      src={video.videoUrl}
                      className="w-full h-auto"
                    >
                      Tu navegador no soporta el tag de video.
                    </video>
                  </div>
                  {video.title && (
                    <p className="mt-2 text-sm font-semibold text-gray-800">{video.title}</p>
                  )}
                  {video.description && (
                    <p className="text-xs text-gray-600">{video.description}</p>
                  )}
                  {isOwner && (
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      disabled={deletingVideo === video.id}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-100 rounded-lg">
              <p className="text-gray-500">No hay videos adicionales</p>
            </div>
          )}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="bg-white p-6 rounded-2xl shadow-xl sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Logros</h2>
            {profile?.achievements && profile.achievements.length > 0 ? (
              <ul className="space-y-3">
                {profile.achievements.map((achievement: any) => (
                  <li key={achievement.id} className="flex items-start group relative">
                    <svg
                      className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex-1">
                      <span className="text-gray-700">{achievement.title}</span>
                      {achievement.description && (
                        <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                      )}
                      {achievement.verified && (
                        <span className="text-xs text-green-600 block mt-1">✓ Verificado</span>
                      )}
                    </div>
                    {isOwner && (
                      <button
                        onClick={() => handleDeleteAchievement(achievement.id)}
                        disabled={deletingAchievement === achievement.id}
                        className="ml-2 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-700 disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No hay logros registrados</p>
            )}
            {profile?.achievements && profile.achievements.some((a: any) => a.verified) && (
              <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-green-700 font-semibold text-center">
                  Validado por Top Talent
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

