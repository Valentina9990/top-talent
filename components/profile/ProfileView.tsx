"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import { deletePlayerAchievement } from "@/actions/player-profile";
import { updatePlayerProfile } from "@/actions/player-profile";
import { useRouter } from "next/navigation";
import { AchievementModal } from "../modals/AchievementModal";
import { PlayerStats } from "./PlayerStats";
import { ConfirmModal } from "../modals/ConfirmModal";
import { VideoUploadModal } from "../modals/VideoUploadModal";

interface ProfileViewProps {
  profile: any;
  user: any;
  isOwner: boolean;
}

export default function ProfileView({ profile, user, isOwner }: ProfileViewProps) {
  const router = useRouter();
  const [deletingAchievement, setDeletingAchievement] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<any>(null);
  const [showDeleteVideoModal, setShowDeleteVideoModal] = useState(false);
  const [showDeleteAchievementModal, setShowDeleteAchievementModal] = useState(false);
  const [achievementToDelete, setAchievementToDelete] = useState<string | null>(null);
  const [isDeletingVideo, setIsDeletingVideo] = useState(false);

  const handleDeleteVideo = async () => {
    setIsDeletingVideo(true);
    const result = await updatePlayerProfile({ profileVideoUrl: "" });
    
    if (result.success) {
      router.refresh();
      setShowDeleteVideoModal(false);
    } else {
      alert(result.error);
    }
    setIsDeletingVideo(false);
  };

  const handleDeleteAchievement = async () => {
    if (!achievementToDelete) return;

    setDeletingAchievement(achievementToDelete);
    const result = await deletePlayerAchievement(achievementToDelete);
    
    if (result.success) {
      router.refresh();
      setShowDeleteAchievementModal(false);
      setAchievementToDelete(null);
    } else {
      alert(result.error);
    }
    setDeletingAchievement(null);
  };

  const openDeleteAchievementModal = (achievementId: string) => {
    setAchievementToDelete(achievementId);
    setShowDeleteAchievementModal(true);
  };

  const avatarUrl = profile?.avatarUrl || user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "Player")}`;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0 relative h-48 md:h-auto md:w-64">
            <Image
              className="object-cover"
              src={avatarUrl}
              alt={user?.name || "Player"}
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              priority
            />
          </div>
          <div className="p-8 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="uppercase tracking-wide text-sm text-primary-500 font-semibold flex flex-wrap gap-2">
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
                  className="bg-primary-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition duration-300"
                >
                  Editar Perfil
                </Link>
              )}
            </div>
            
            <PlayerStats
              goals={profile?.goals || 0}
              assists={profile?.assists || 0}
              matchesPlayed={profile?.matchesPlayed || 0}
            />
            
            {!isOwner && (
              <button className="mt-8 bg-primary-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition duration-300">
                Contactar Jugador
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Video de Presentación</h2>
              {isOwner && profile?.profileVideoUrl && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="text-primary-500 hover:text-primary-700 transition-colors"
                    title="Editar video"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowDeleteVideoModal(true)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                    title="Eliminar video"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {profile?.profileVideoUrl ? (
              <div className="rounded-xl overflow-hidden shadow-lg bg-black">
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
              <div
                className="rounded-xl overflow-hidden shadow-lg bg-gray-100 flex flex-col items-center justify-center h-64 cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => isOwner && setShowVideoModal(true)}
              >
                {isOwner ? (
                  <>
                    <Plus className="w-16 h-16 text-gray-400 mb-3" />
                    <p className="text-gray-500 font-semibold">Agregar video de presentación</p>
                    <p className="text-gray-400 text-sm mt-1">Click para subir</p>
                  </>
                ) : (
                  <p className="text-gray-500">No hay video de presentación</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-2xl shadow-xl sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Logros</h2>
            </div>

            {profile?.achievements && profile.achievements.length > 0 ? (
              <ul className="space-y-3">
                {profile.achievements.map((achievement: any) => (
                  <li key={achievement.id} className="flex items-start relative">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
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
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => {
                            setEditingAchievement(achievement);
                            setShowAchievementModal(true);
                          }}
                          className="text-primary-500 hover:text-primary-700 transition-colors"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteAchievementModal(achievement.id)}
                          disabled={deletingAchievement === achievement.id}
                          className="text-red-600 hover:text-red-700 disabled:opacity-50 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className={`text-center py-8 ${isOwner ? 'cursor-pointer hover:bg-gray-50 rounded-lg transition-colors' : ''}`}
                onClick={() => isOwner && setShowAchievementModal(true)}
              >
                {isOwner ? (
                  <>
                    <Plus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm font-semibold">Agregar tu primer logro</p>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">No hay logros registrados</p>
                )}
              </div>
            )}

            {profile?.achievements && profile.achievements.some((a: any) => a.verified) && (
              <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-green-700 font-semibold text-center">
                  Validado por TopTalent
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOwner && (
        <>
          <VideoUploadModal
            isOpen={showVideoModal}
            onClose={() => setShowVideoModal(false)}
            currentVideoUrl={profile?.profileVideoUrl}
          />
          <AchievementModal
            isOpen={showAchievementModal}
            onClose={() => {
              setShowAchievementModal(false);
              setEditingAchievement(null);
            }}
            achievement={editingAchievement}
          />
          <ConfirmModal
            isOpen={showDeleteVideoModal}
            onClose={() => setShowDeleteVideoModal(false)}
            onConfirm={handleDeleteVideo}
            title="¿Eliminar video?"
            description="¿Estás seguro de que deseas eliminar este video de presentación? Esta acción no se puede deshacer."
            confirmText="Eliminar"
            isLoading={isDeletingVideo}
          />
          <ConfirmModal
            isOpen={showDeleteAchievementModal}
            onClose={() => {
              setShowDeleteAchievementModal(false);
              setAchievementToDelete(null);
            }}
            onConfirm={handleDeleteAchievement}
            title="¿Eliminar logro?"
            description="¿Estás seguro de que deseas eliminar este logro? Esta acción no se puede deshacer."
            confirmText="Eliminar"
            isLoading={!!deletingAchievement}
          />
        </>
      )}
    </>
  );
}

