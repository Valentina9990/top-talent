"use client";

import React, { useState, useEffect } from "react";
import { Position, Category, PlayerProfileFormData, Department, City } from "@/types/player-profile";
import { AvatarUpload } from "./AvatarUpload";
import { getCitiesByDepartment } from "@/actions/player-profile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";

interface BasicInfoFormProps {
  formData: PlayerProfileFormData;
  positions: Position[];
  categories: Category[];
  departments: Department[];
  validationErrors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onPositionsChange: (positionIds: string[], primaryPositionId: string) => void;
  currentAvatarUrl?: string | null;
  playerName?: string | null;
  onAvatarChange: (url: string) => void;
}

export function BasicInfoForm({
  formData,
  positions,
  categories,
  departments,
  validationErrors,
  onChange,
  onSelectChange,
  onPositionsChange,
  currentAvatarUrl,
  playerName,
  onAvatarChange,
}: BasicInfoFormProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    if (formData.departmentId) {
      setLoadingCities(true);
      getCitiesByDepartment(formData.departmentId).then((res) => {
        if (res.cities) setCities(res.cities);
        setLoadingCities(false);
      });
    } else {
      setCities([]);
    }
  }, [formData.departmentId]);

  const handlePositionToggle = (positionId: string) => {
    const currentPositions = formData.positionIds || [];
    const isSelected = currentPositions.includes(positionId);
    let newPositions: string[];
    let newPrimary = formData.primaryPositionId || "";

    if (isSelected) {
      newPositions = currentPositions.filter((id) => id !== positionId);
      // If removed position was primary, clear it
      if (newPrimary === positionId) newPrimary = newPositions[0] || "";
    } else {
      newPositions = [...currentPositions, positionId];
      // Auto-set as primary if it's the first selection
      if (!newPrimary) newPrimary = positionId;
    }

    onPositionsChange(newPositions, newPrimary);
  };

  const handleSetPrimary = (positionId: string) => {
    const currentPositions = formData.positionIds || [];
    onPositionsChange(currentPositions, positionId);
  };

  const handleDepartmentChange = (value: string) => {
    onSelectChange("departmentId", value);
    onSelectChange("cityId", "");
  };

  return (
    <div className="border-b pb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Información Básica</h2>

      <AvatarUpload
        avatarUrl={currentAvatarUrl}
        playerName={playerName}
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
              validationErrors.team ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nombre del equipo"
          />
          {validationErrors.team && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.team}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pierna Preferida
          </label>
          <Select
            value={formData.preferredFoot || ""}
            onValueChange={(value) => onSelectChange("preferredFoot", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RIGHT">Derecha</SelectItem>
              <SelectItem value="LEFT">Izquierda</SelectItem>
              <SelectItem value="BOTH">Ambas</SelectItem>
            </SelectContent>
          </Select>
          {validationErrors.preferredFoot && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.preferredFoot}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <Select
            value={formData.categoryId || ""}
            onValueChange={(value) => onSelectChange("categoryId", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationErrors.categoryId && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.categoryId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departamento
          </label>
          <Select
            value={formData.departmentId || ""}
            onValueChange={handleDepartmentChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar departamento" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad
          </label>
          <Select
            value={formData.cityId || ""}
            onValueChange={(value) => onSelectChange("cityId", value)}
            disabled={!formData.departmentId || loadingCities}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  !formData.departmentId
                    ? "Selecciona un departamento primero"
                    : loadingCities
                    ? "Cargando..."
                    : "Seleccionar ciudad"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Positions Multi-Select with Primary */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Posiciones
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Selecciona una o varias posiciones. Marca{" "}
          <Star className="inline w-3 h-3 text-amber-500 fill-amber-500" /> para indicar la posición principal.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {positions.map((pos) => {
            const isSelected = formData.positionIds?.includes(pos.id) || false;
            const isPrimary = formData.primaryPositionId === pos.id;

            return (
              <div
                key={pos.id}
                className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
                  isSelected
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-300 hover:border-primary-300"
                }`}
              >
                <label className="flex items-center cursor-pointer flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handlePositionToggle(pos.id)}
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500 shrink-0"
                  />
                  <span
                    className={`ml-2 text-sm font-medium truncate ${
                      isSelected ? "text-primary-700" : "text-gray-700"
                    }`}
                  >
                    {pos.name}
                  </span>
                </label>

                {isSelected && (
                  <button
                    type="button"
                    title={isPrimary ? "Posición principal" : "Marcar como principal"}
                    onClick={() => handleSetPrimary(pos.id)}
                    className="ml-2 shrink-0"
                  >
                    <Star
                      className={`w-4 h-4 transition-colors ${
                        isPrimary
                          ? "text-amber-500 fill-amber-500"
                          : "text-gray-300 hover:text-amber-400"
                      }`}
                    />
                  </button>
                )}
              </div>
            );
          })}
        </div>
        {formData.positionIds && formData.positionIds.length > 0 && !formData.primaryPositionId && (
          <p className="mt-1 text-sm text-amber-600">Selecciona una posición principal (⭐)</p>
        )}
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
            validationErrors.bio ? "border-red-500" : "border-gray-300"
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

