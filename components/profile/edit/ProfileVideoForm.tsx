"use client";

import React from "react";
import { PlayerProfileFormData } from "@/types/player-profile";

interface ProfileVideoFormProps {
  formData: PlayerProfileFormData;
  validationErrors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileVideoForm({
  formData,
  validationErrors,
  onChange,
}: ProfileVideoFormProps) {
  return (
    <div className="border-b pb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Video de Presentación</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL del Video Principal
        </label>
        <input
          type="url"
          name="profileVideoUrl"
          value={formData.profileVideoUrl || ""}
          onChange={onChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            validationErrors.profileVideoUrl ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="https://ejemplo.com/video.mp4"
        />
        {validationErrors.profileVideoUrl && (
          <p className="mt-1 text-sm text-red-600">{validationErrors.profileVideoUrl}</p>
        )}
      </div>
    </div>
  );
}

