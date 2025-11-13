"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  updatePlayerProfile,
  getPositions,
  getCategories,
} from "@/actions/player-profile";
import { updatePlayerAvatar } from "@/actions/media-upload";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { PlayerProfileSchema } from "@/schemas";
import { formatZodErrors } from "@/lib/validation";
import {
  Position,
  Category,
  PlayerProfileFormData,
  PlayerProfile,
} from "@/types/player-profile";
import { BasicInfoForm } from "./edit/BasicInfoForm";
import { StatisticsForm } from "./edit/StatisticsForm";
import { CancelConfirmModal } from "../modals/CancelConfirmModal";

interface ProfileEditProps {
  profile: PlayerProfile;
}

export default function ProfileEdit({ profile }: ProfileEditProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [positions, setPositions] = useState<Position[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const initialFormData: PlayerProfileFormData = {
    team: profile?.team || "",
    zone: profile?.zone || "",
    bio: profile?.bio || "",
    preferredFoot: profile?.preferredFoot || "",
    positionIds: profile?.positions?.map((p) => p.id) || [],
    categoryId: profile?.categoryId || "",
    goals: profile?.goals || 0,
    assists: profile?.assists || 0,
    matchesPlayed: profile?.matchesPlayed || 0,
  };

  const [formData, setFormData] = useState<PlayerProfileFormData>(initialFormData);

  useEffect(() => {
    const loadData = async () => {
      const [posResult, catResult] = await Promise.all([
        getPositions(),
        getCategories(),
      ]);

      if (posResult.positions) setPositions(posResult.positions);
      if (catResult.categories) setCategories(catResult.categories);
    };

    loadData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "goals" || name === "assists" || name === "matchesPlayed"
        ? parseInt(value) || 0
        : value,
    }));
  };

  const handlePositionsChange = (positionIds: string[]) => {
    setFormData((prev) => ({
      ...prev,
      positionIds,
    }));
  };

  const handleAvatarChange = async (url: string) => {
    const result = await updatePlayerAvatar(url);
    if (result.success) {
      setSuccess("Avatar actualizado");
      setTimeout(() => setSuccess(""), 2000);
      router.refresh();
    } else if (result.error) {
      setError(result.error);
      setTimeout(() => setError(""), 3000);
    }
  };

  const hasUnsavedChanges = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  };

  const handleCancel = () => {
    if (hasUnsavedChanges()) {
      setShowCancelModal(true);
    } else {
      router.push("/perfil");
    }
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    router.push("/perfil");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setValidationErrors({});

    const validation = PlayerProfileSchema.safeParse(formData);

    if (!validation.success) {
      setValidationErrors(formatZodErrors(validation.error));
      setError("Por favor corrige los errores en el formulario");
      return;
    }

    startTransition(async () => {
      const result = await updatePlayerProfile(formData);

      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.success);
        setTimeout(() => {
          router.push("/perfil");
          router.refresh();
        }, 1500);
      }
    });
  };

  return (
    <>
      <CancelConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
      />

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Editar Perfil</h1>
          <button
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-900 transition duration-300"
          >
            Cancelar
          </button>
        </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicInfoForm
          formData={formData}
          positions={positions}
          categories={categories}
          validationErrors={validationErrors}
          onChange={handleInputChange}
          onPositionsChange={handlePositionsChange}
          currentAvatarUrl={profile?.user?.image}
          onAvatarChange={handleAvatarChange}
        />

        <StatisticsForm
          formData={formData}
          validationErrors={validationErrors}
          onChange={handleInputChange}
        />

        <FormError message={error} />
        <FormSuccess message={success} />

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>

      </div>
    </>
  );
}

