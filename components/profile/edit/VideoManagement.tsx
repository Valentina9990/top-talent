"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addPlayerVideo } from "@/actions/player-profile";
import { PlayerVideoSchema } from "@/schemas";
import { formatZodErrors } from "@/lib/validation";
import { VideoFormData } from "@/types/player-profile";

export function VideoManagement() {
  const router = useRouter();
  const [newVideo, setNewVideo] = useState<VideoFormData>({
    url: "",
    title: "",
    description: ""
  });
  const [addingVideo, setAddingVideo] = useState(false);
  const [videoErrors, setVideoErrors] = useState<Record<string, string>>({});

  const handleAddVideo = async () => {
    setVideoErrors({});

    const validation = PlayerVideoSchema.safeParse(newVideo);

    if (!validation.success) {
      setVideoErrors(formatZodErrors(validation.error));
      return;
    }

    setAddingVideo(true);
    const result = await addPlayerVideo(newVideo.url, newVideo.title, newVideo.description);

    if (result.error) {
      setVideoErrors({ general: result.error });
    } else {
      setNewVideo({ url: "", title: "", description: "" });
      router.refresh();
    }
    setAddingVideo(false);
  };

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Agregar Videos</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL del Video
          </label>
          <input
            type="url"
            value={newVideo.url}
            onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              videoErrors.url ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://ejemplo.com/video.mp4"
          />
          {videoErrors.url && (
            <p className="mt-1 text-sm text-red-600">{videoErrors.url}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título (opcional)
          </label>
          <input
            type="text"
            value={newVideo.title}
            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              videoErrors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Título del video"
          />
          {videoErrors.title && (
            <p className="mt-1 text-sm text-red-600">{videoErrors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción (opcional)
          </label>
          <textarea
            value={newVideo.description}
            onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
            rows={2}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              videoErrors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Descripción del video"
          />
          {videoErrors.description && (
            <p className="mt-1 text-sm text-red-600">{videoErrors.description}</p>
          )}
        </div>

        {videoErrors.general && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{videoErrors.general}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddVideo}
          disabled={addingVideo}
          className="w-full px-4 py-2 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-700 transition duration-300 disabled:opacity-50"
        >
          {addingVideo ? "Agregando..." : "Agregar Video"}
        </button>
      </div>
    </div>
  );
}

