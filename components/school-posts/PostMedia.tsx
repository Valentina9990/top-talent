"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface PostMediaProps {
  mediaUrl: string;
  mediaType: "image" | "video";
  altText: string;
}

export function PostMedia({ mediaUrl, mediaType, altText }: PostMediaProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (mediaType === "image") {
    return (
      <div className="relative bg-gray-100 w-full h-auto">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
          </div>
        )}
        <Image
          src={mediaUrl}
          alt={altText}
          width={1200}
          height={600}
          className="w-full max-h-[600px] object-cover"
          onLoad={() => setIsLoading(false)}
          priority={false}
        />
      </div>
    );
  }

  if (mediaType === "video") {
    return (
      <div className="relative bg-black">
        <video
          src={mediaUrl}
          controls
          className="w-full max-h-[600px]"
          onLoadedData={() => setIsLoading(false)}
          preload="metadata"
        >
          Tu navegador no soporta la reproducción de videos.
        </video>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="flex flex-col items-center gap-3">
              <Play className="w-16 h-16 text-white/80" />
              <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
