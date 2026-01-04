"use client";

import React from "react";
import { Position, Category, PlayerProfileFormData } from "@/types/player-profile";
import { AvatarUpload } from "./AvatarUpload";

interface BasicInfoFormProps {
  formData: PlayerProfileFormData;
  positions: Position[];
  categories: Category[];
  validationErrors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onPositionsChange: (positionIds: string[]) => void;
  currentAvatarUrl?: string | null;
  onAvatarChange: (url: string) => void;
}

export function BasicInfoForm({
  formData,
  positions,
  categories,
  validationErrors,
  onChange,
  onPositionsChange,
  currentAvatarUrl,
  onAvatarChange,
}: BasicInfoFormProps) {
  const handlePositionToggle = (positionId: string) => {
    const currentPositions = formData.positionIds || [];
    const isSelected = currentPositions.includes(positionId);

    if (isSelected) {
      onPositionsChange(currentPositions.filter((id) => id !== positionId));
    } else {
      onPositionsChange([...currentPositions, positionId]);
    }
  };

  return (
    <div className="border-b pb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Información Básica</h2>

      <AvatarUpload
        avatarUrl={currentAvatarUrl}
        onAvatarChange={onAvatarChange}
        className="mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Equipo
          </label>
          <input
            type="text"
            name="team"
            value={formData.team || ""}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              validationErrors.team ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nombre del equipo"
          />
          {validationErrors.team && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.team}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zona
          </label>
          <input
            type="text"
            name="zone"
            value={formData.zone || ""}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              validationErrors.zone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ciudad o región"
          />
          {validationErrors.zone && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.zone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pierna Preferida
          </label>
          <select
            name="preferredFoot"
            value={formData.preferredFoot || ""}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              validationErrors.preferredFoot ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Seleccionar</option>
            <option value="RIGHT">Derecha</option>
            <option value="LEFT">Izquierda</option>
            <option value="BOTH">Ambas</option>
          </select>
          {validationErrors.preferredFoot && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.preferredFoot}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            name="categoryId"
            value={formData.categoryId || ""}
            onChange={onChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              validationErrors.categoryId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {validationErrors.categoryId && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.categoryId}</p>
          )}
        </div>
      </div>

      {/* Positions Multi-Select */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Posiciones (puedes seleccionar varias)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {positions.map((pos) => (
            <label
              key={pos.id}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                formData.positionIds?.includes(pos.id)
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 hover:border-primary-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.positionIds?.includes(pos.id) || false}
                onChange={() => handlePositionToggle(pos.id)}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm font-medium">{pos.name}</span>
            </label>
          ))}
        </div>
        {validationErrors.positionIds && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.positionIds}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Biografía
        </label>
        <textarea
          name="bio"
          value={formData.bio || ""}
          onChange={onChange}
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            validationErrors.bio ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Cuéntanos sobre ti..."
        />
        {validationErrors.bio && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.bio}</p>
        )}
      </div>
    </div>
  );
}

