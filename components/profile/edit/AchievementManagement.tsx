"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  addPlayerAchievement,
  updatePlayerAchievement,
  deletePlayerAchievement,
} from "@/actions/player-profile";
import { PlayerAchievementSchema } from "@/schemas";
import { formatZodErrors } from "@/lib/validation";
import { AchievementFormData, PlayerAchievement } from "@/types/player-profile";

interface AchievementManagementProps {
  achievements: PlayerAchievement[];
}

export function AchievementManagement({ achievements }: AchievementManagementProps) {
  const router = useRouter();
  const [achievementList, setAchievementList] = useState<AchievementFormData[]>(
    achievements.map((a) => ({
      id: a.id,
      title: a.title,
      description: a.description || "",
      date: a.date || undefined,
    }))
  );
  const [newAchievement, setNewAchievement] = useState<AchievementFormData>({
    title: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingAchievement, setAddingAchievement] = useState(false);
  const [achievementErrors, setAchievementErrors] = useState<Record<string, string>>({});

  const handleAddAchievement = async () => {
    setAchievementErrors({});

    const validation = PlayerAchievementSchema.safeParse(newAchievement);

    if (!validation.success) {
      setAchievementErrors(formatZodErrors(validation.error));
      return;
    }

    setAddingAchievement(true);
    const result = await addPlayerAchievement(
      newAchievement.title,
      newAchievement.description,
      newAchievement.date
    );

    if (result.error) {
      setAchievementErrors({ general: result.error });
    } else if (result.achievement) {
      setAchievementList((prev) => [
        ...prev,
        {
          id: result.achievement.id,
          title: result.achievement.title,
          description: result.achievement.description || "",
          date: result.achievement.date || undefined,
        },
      ]);
      setNewAchievement({ title: "", description: "" });
      router.refresh();
    }
    setAddingAchievement(false);
  };

  const handleUpdateAchievement = async (achievement: AchievementFormData) => {
    if (!achievement.id) return;

    setAchievementErrors({});

    const validation = PlayerAchievementSchema.safeParse(achievement);

    if (!validation.success) {
      setAchievementErrors(formatZodErrors(validation.error));
      return;
    }

    const result = await updatePlayerAchievement(
      achievement.id,
      achievement.title,
      achievement.description,
      achievement.date
    );

    if (result.error) {
      setAchievementErrors({ general: result.error });
    } else {
      setEditingId(null);
      router.refresh();
    }
  };

  const handleDeleteAchievement = async (achievementId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este logro?")) {
      return;
    }

    const result = await deletePlayerAchievement(achievementId);

    if (result.error) {
      alert(result.error);
    } else {
      setAchievementList((prev) => prev.filter((a) => a.id !== achievementId));
      router.refresh();
    }
  };

  const handleAchievementChange = (id: string, field: keyof AchievementFormData, value: string) => {
    setAchievementList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Gestionar Logros</h2>

      {achievementList.length > 0 && (
        <div className="mb-6 space-y-4">
          {achievementList.map((achievement) => (
            <div
              key={achievement.id}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              {editingId === achievement.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={achievement.title}
                    onChange={(e) =>
                      handleAchievementChange(achievement.id!, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Título del logro"
                  />
                  <textarea
                    value={achievement.description}
                    onChange={(e) =>
                      handleAchievementChange(achievement.id!, "description", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Descripción"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateAchievement(achievement)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    {achievement.description && (
                      <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setEditingId(achievement.id!)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"
                      title="Editar"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteAchievement(achievement.id!)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Eliminar"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4 p-4 bg-primary-50 rounded-lg">
        <h3 className="font-semibold text-gray-900">Agregar Nuevo Logro</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título del Logro
          </label>
          <input
            type="text"
            value={newAchievement.title}
            onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              achievementErrors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ej: Campeón Copa Regional 2024"
          />
          {achievementErrors.title && (
            <p className="mt-1 text-sm text-red-600">{achievementErrors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción (opcional)
          </label>
          <textarea
            value={newAchievement.description}
            onChange={(e) =>
              setNewAchievement({ ...newAchievement, description: e.target.value })
            }
            rows={2}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              achievementErrors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Detalles del logro"
          />
          {achievementErrors.description && (
            <p className="mt-1 text-sm text-red-600">{achievementErrors.description}</p>
          )}
        </div>

        {achievementErrors.general && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{achievementErrors.general}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddAchievement}
          disabled={addingAchievement}
          className="w-full px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition duration-300 disabled:opacity-50"
        >
          {addingAchievement ? "Agregando..." : "Agregar Logro"}
        </button>
      </div>
    </div>
  );
}

