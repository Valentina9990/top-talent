"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePlayerProfile } from "@/actions/player-profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VideoUpload } from "./edit/VideoUpload";

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVideoUrl?: string;
}

export function VideoUploadModal({ isOpen, onClose, currentVideoUrl }: VideoUploadModalProps) {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState(currentVideoUrl || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!videoUrl) {
      setError("Por favor sube un video");
      return;
    }

    setIsSaving(true);
    setError("");

    const result = await updatePlayerProfile({ profileVideoUrl: videoUrl });

    if (result.error) {
      setError(result.error);
      setIsSaving(false);
    } else {
      router.refresh();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {currentVideoUrl ? "Actualizar Video de Presentación" : "Agregar Video de Presentación"}
          </DialogTitle>
          <DialogDescription>
            Sube un video que muestre tus mejores jugadas y habilidades en el campo
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <VideoUpload
            videoUrl={videoUrl}
            onVideoChange={setVideoUrl}
            title=""
            description=""
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
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
              disabled={isSaving || !videoUrl}
              className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
