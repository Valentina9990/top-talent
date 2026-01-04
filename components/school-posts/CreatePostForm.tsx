"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { Image, Video, X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";

interface CreatePostFormProps {
  schoolId: string;
  onSuccess?: () => void;
}

export function CreatePostForm({ schoolId, onSuccess }: CreatePostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { uploadFile, isUploading } = useFileUpload();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      setError("Solo se permiten imágenes o videos");
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError("El archivo no debe superar 50MB");
      return;
    }

    setSelectedFile(file);
    setMediaType(isImage ? "image" : "video");
    setError(null);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const removeFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setMediaType(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      setError("El título y la descripción son obligatorios");
      return;
    }

    setError(null);

    try {
      let mediaUrl: string | null = null;

      if (selectedFile && mediaType) {
        const result = await uploadFile(selectedFile, mediaType);
        if (!result.success || !result.fileUrl) {
          throw new Error(result.error || "Error al subir el archivo");
        }
        mediaUrl = result.fileUrl;
      }

      startTransition(async () => {
        const response = await fetch("/api/school-posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            schoolId,
            title: title.trim(),
            description: description.trim(),
            mediaUrl,
            mediaType,
          }),
        });

        if (!response.ok) {
          throw new Error("Error al crear la publicación");
        }

        setTitle("");
        setDescription("");
        removeFile();
        
        router.refresh();
        onSuccess?.();
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la publicación");
    }
  };

  const isSubmitting = isPending || isUploading;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Crear Publicación</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
          Título *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: ¡Gran victoria en el torneo regional!"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          maxLength={100}
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
          Descripción *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Cuéntanos más sobre esta publicación..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          maxLength={1000}
          disabled={isSubmitting}
        />
        <p className="text-xs text-gray-500 mt-1">{description.length}/1000 caracteres</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Imagen o Video (opcional)
        </label>
        
        {!selectedFile ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
              id="media-upload"
              disabled={isSubmitting}
            />
            <label htmlFor="media-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="bg-gray-100 rounded-full p-4">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Haz clic para subir</p>
                  <p className="text-sm text-gray-500">Imágenes o videos hasta 50MB</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <Image className="w-3 h-3" /> Imagen
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <Video className="w-3 h-3" /> Video
                  </span>
                </div>
              </div>
            </label>
          </div>
        ) : (
          <div className="relative border border-gray-300 rounded-lg overflow-hidden">
            {mediaType === "image" && previewUrl && (
              <NextImage src={previewUrl} alt="Preview" width={800} height={384} className="w-full max-h-96 object-cover" />
            )}
            {mediaType === "video" && previewUrl && (
              <video src={previewUrl} controls className="w-full max-h-96" />
            )}
            <button
              type="button"
              onClick={removeFile}
              disabled={isSubmitting}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || !title.trim() || !description.trim()}
        className="w-full bg-primary-500 hover:bg-primary-500 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            {isUploading ? "Subiendo archivo..." : "Publicando..."}
          </span>
        ) : (
          "Publicar"
        )}
      </Button>
    </form>
  );
}
