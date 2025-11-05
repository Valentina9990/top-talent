"use client";

import React, { useState, useRef } from "react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Video, Upload, Trash2, Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoUploadProps {
  videoUrl: string | null | undefined;
  onVideoChange: (url: string) => void;
  title?: string;
  description?: string;
  className?: string;
}

export function VideoUpload({ 
  videoUrl, 
  onVideoChange, 
  title = "Video de Presentación",
  description = "Sube un video que muestre tus habilidades en el campo",
  className = "" 
}: VideoUploadProps) {
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadFile, deleteFile, uploadProgress, isUploading } = useFileUpload({
    onSuccess: (url) => {
      onVideoChange(url);
      setUploadError("");
    },
    onError: (error) => {
      setUploadError(error);
    },
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 100) {
      setUploadError("El archivo es demasiado grande. Máximo: 100MB");
      return;
    }

    if (!file.type.startsWith("video/")) {
      setUploadError("Solo se permiten videos");
      return;
    }

    await uploadFile(file, "video");
  };

  const handleRemoveVideo = async () => {
    if (videoUrl) {
      const success = await deleteFile(videoUrl);
      if (success) {
        onVideoChange("");
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>

      {videoUrl ? (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-black border-2 border-gray-200">
            <video
              src={videoUrl}
              controls
              className="w-full max-h-96"
              preload="metadata"
            >
              Tu navegador no soporta el elemento de video.
            </video>
            
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="text-center text-white">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto mb-2" />
                  <p>Subiendo video...</p>
                  <p className="text-sm mt-1">{uploadProgress.progress}%</p>
                </div>
              </div>
            )}
          </div>
          
          {!isUploading && (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClick}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Cambiar video
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemoveVideo}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Video className="w-8 h-8 text-gray-400" />
            </div>
            
            <div>
              <p className="font-medium text-gray-900 mb-1">
                Sube tu video de presentación
              </p>
              <p className="text-sm text-gray-500">
                MP4, WEBM, MOV (máx. 100MB)
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleClick}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Seleccionar video
            </Button>
          </div>
        </div>
      )}


      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {isUploading && !videoUrl && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Subiendo video...</span>
            <span>{uploadProgress.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary-500 h-full transition-all duration-300"
              style={{ width: `${uploadProgress.progress}%` }}
            />
          </div>
        </div>
      )}

      {uploadError && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{uploadError}</p>
        </div>
      )}

      {!videoUrl && !isUploading && (
        <p className="mt-3 text-xs text-gray-500">
          Formatos soportados: MP4, WEBM, MOV. Tamaño máximo: 100MB.
          El video debe mostrar tus mejores jugadas y habilidades.
        </p>
      )}
    </div>
  );
}
