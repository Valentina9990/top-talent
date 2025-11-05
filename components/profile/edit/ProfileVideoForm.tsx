"use client";

import React from "react";
import { PlayerProfileFormData } from "@/types/player-profile";
import { VideoUpload } from "./VideoUpload";

interface ProfileVideoFormProps {
  formData: PlayerProfileFormData;
  validationErrors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVideoChange: (url: string) => void;
}

export function ProfileVideoForm({
  formData,
  validationErrors,
  onChange,
  onVideoChange,
}: ProfileVideoFormProps) {
  return (
    <div className="border-b pb-6">
      <VideoUpload
        videoUrl={formData.profileVideoUrl}
        onVideoChange={onVideoChange}
        title="Video de Presentación"
        description="Sube un video que muestre tus mejores jugadas y habilidades en el campo"
      />
    </div>
  );
}

