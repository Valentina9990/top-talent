"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addPlayerAchievement, updatePlayerAchievement } from "@/actions/player-profile";
import { PlayerAchievementSchema } from "@/schemas";
import { formatZodErrors } from "@/lib/validation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement?: {
    id: string;
    title: string;
    description?: string | null;
    date?: Date | null;
  };
}

export function AchievementModal({ isOpen, onClose, achievement }: AchievementModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState(achievement?.title || "");
  const [description, setDescription] = useState(achievement?.description || "");
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = async () => {
    setErrors({});

    const validation = PlayerAchievementSchema.safeParse({
      title,
      description,
    });

    if (!validation.success) {
      setErrors(formatZodErrors(validation.error));
      return;
    }

    setIsSaving(true);

    let result;
    if (achievement?.id) {
      result = await updatePlayerAchievement(achievement.id, title, description);
    } else {
      result = await addPlayerAchievement(title, description);
    }

    if (result.error) {
      setErrors({ general: result.error });
      setIsSaving(false);
    } else {
      router.refresh();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {achievement ? "Editar Logro" : "Agregar Logro"}
          </DialogTitle>
          <DialogDescription>
            {achievement ? "Modifica la información de tu logro" : "Agrega un nuevo logro a tu perfil"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título del Logro
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: Campeón Copa Regional 2024"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción (opcional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Detalles del logro"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition duration-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !title}
              className="px-4 py-2 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
