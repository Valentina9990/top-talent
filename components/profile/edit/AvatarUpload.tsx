"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useFileUpload } from "@/hooks/use-file-upload";
import { User, Upload, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AvatarUploadProps {
  avatarUrl: string | null | undefined;
  onAvatarChange: (url: string) => void;
  className?: string;
}

export function AvatarUpload({ avatarUrl, onAvatarChange, className = "" }: AvatarUploadProps) {
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadFile, deleteFile, uploadProgress, isUploading } = useFileUpload({
    onSuccess: (url) => {
      onAvatarChange(url);
      setUploadError("");
    },
    onError: (error) => {
      setUploadError(error);
    },
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 10) {
      setUploadError("El archivo es demasiado grande. Máximo: 10MB");
      return;
    }

    // Validar tipo
    if (!file.type.startsWith("image/")) {
      setUploadError("Solo se permiten imágenes");
      return;
    }

    await uploadFile(file, "image");
  };

  const handleRemoveAvatar = async () => {
    if (avatarUrl) {
      const success = await deleteFile(avatarUrl);
      if (success) {
        onAvatarChange("");
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Foto de Perfil
      </label>

      <div className="flex items-start gap-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Avatar"
                width={128}
                height={128}
                className="object-cover w-full h-full"
                unoptimized
              />
            ) : (
              <User className="w-16 h-16 text-gray-400" />
            )}
          </div>

          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClick}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {avatarUrl ? "Cambiar foto" : "Subir foto"}
            </Button>

            {avatarUrl && !isUploading && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemoveAvatar}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </Button>
            )}
          </div>

          {isUploading && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Subiendo...</span>
                <span>{uploadProgress.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-primary-500 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress.progress}%` }}
                />
              </div>
            </div>
          )}

          {uploadError && (
            <p className="text-sm text-red-600">{uploadError}</p>
          )}

          <p className="text-xs text-gray-500">
            JPG, PNG, GIF o WEBP. Máximo 10MB.
          </p>
        </div>
      </div>
    </div>
  );
}
