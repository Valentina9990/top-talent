"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { School, Calendar } from "lucide-react";
import { PostMedia } from "./PostMedia";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const schoolName = post.school.officialName || post.school.user.name;
  const schoolImage = post.school.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(schoolName)}`;
  
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: es,
  });

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              src={schoolImage}
              alt={schoolName}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-primary-100"
            />
            <div className="absolute -bottom-1 -right-1 bg-primary-500 rounded-full p-1.5">
              <School className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg">{schoolName}</h3>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.createdAt.toISOString()}>{timeAgo}</time>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {post.description}
        </p>
      </div>

      {post.mediaUrl && post.mediaType && (
        <PostMedia 
          mediaUrl={post.mediaUrl} 
          mediaType={post.mediaType as "image" | "video"}
          altText={post.title}
        />
      )}
    </article>
  );
}
