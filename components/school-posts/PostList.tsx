"use client";

import { Post } from "@/types/post";
import { PostCard } from "./PostCard";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 text-lg">No hay publicaciones aún</p>
        <p className="text-gray-400 text-sm mt-2">Sé el primero en compartir algo</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
