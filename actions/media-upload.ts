"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Actualiza el avatar del jugador
 */
export async function updatePlayerAvatar(avatarUrl: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autorizado" };
    }

    // Buscar el perfil del jugador
    const profile = await prisma.playerProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      return { error: "Perfil no encontrado" };
    }

    // Actualizar avatar
    await prisma.playerProfile.update({
      where: { id: profile.id },
      data: { avatarUrl },
    });

    // También actualizar el avatar en el usuario
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: avatarUrl },
    });

    revalidatePath("/perfil");
    return { success: "Avatar actualizado exitosamente" };
  } catch (error) {
    console.error("Error actualizando avatar:", error);
    return { error: "Error actualizando avatar" };
  }
}

/**
 * Actualiza el video de presentación del perfil
 */
export async function updatePlayerProfileVideo(videoUrl: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autorizado" };
    }

    const profile = await prisma.playerProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      return { error: "Perfil no encontrado" };
    }

    await prisma.playerProfile.update({
      where: { id: profile.id },
      data: { profileVideoUrl: videoUrl },
    });

    revalidatePath("/perfil");
    return { success: "Video de perfil actualizado exitosamente" };
  } catch (error) {
    console.error("Error actualizando video de perfil:", error);
    return { error: "Error actualizando video de perfil" };
  }
}

/**
 * Agrega un nuevo video a la galería del jugador
 */
export async function addPlayerVideo(
  videoUrl: string,
  title?: string,
  description?: string
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autorizado" };
    }

    const profile = await prisma.playerProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      return { error: "Perfil no encontrado" };
    }

    const video = await prisma.playerVideo.create({
      data: {
        playerId: profile.id,
        videoUrl,
        title: title || "Video sin título",
        description: description || null,
      },
    });

    revalidatePath("/perfil");
    return {
      success: "Video agregado exitosamente",
      video: {
        id: video.id,
        videoUrl: video.videoUrl,
        title: video.title,
      },
    };
  } catch (error) {
    console.error("Error agregando video:", error);
    return { error: "Error agregando video" };
  }
}

/**
 * Elimina un video de la galería del jugador
 */
export async function deletePlayerVideo(videoId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autorizado" };
    }

    // Verificar que el video pertenece al usuario
    const profile = await prisma.playerProfile.findUnique({
      where: { userId: session.user.id },
      include: { videos: true },
    });

    if (!profile) {
      return { error: "Perfil no encontrado" };
    }

    const video = profile.videos.find((v) => v.id === videoId);

    if (!video) {
      return { error: "Video no encontrado o no tienes permiso para eliminarlo" };
    }

    await prisma.playerVideo.delete({
      where: { id: videoId },
    });

    revalidatePath("/perfil");
    return { success: "Video eliminado exitosamente" };
  } catch (error) {
    console.error("Error eliminando video:", error);
    return { error: "Error eliminando video" };
  }
}

/**
 * Actualiza un video existente
 */
export async function updatePlayerVideo(
  videoId: string,
  data: {
    title?: string;
    description?: string;
    videoUrl?: string;
  }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autorizado" };
    }

    // Verificar que el video pertenece al usuario
    const profile = await prisma.playerProfile.findUnique({
      where: { userId: session.user.id },
      include: { videos: true },
    });

    if (!profile) {
      return { error: "Perfil no encontrado" };
    }

    const video = profile.videos.find((v) => v.id === videoId);

    if (!video) {
      return { error: "Video no encontrado o no tienes permiso para editarlo" };
    }

    await prisma.playerVideo.update({
      where: { id: videoId },
      data,
    });

    revalidatePath("/perfil");
    return { success: "Video actualizado exitosamente" };
  } catch (error) {
    console.error("Error actualizando video:", error);
    return { error: "Error actualizando video" };
  }
}

/**
 * Obtiene todos los videos del jugador
 */
export async function getPlayerVideos() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autorizado" };
    }

    const profile = await prisma.playerProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        videos: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!profile) {
      return { error: "Perfil no encontrado" };
    }

    return { success: true, videos: profile.videos };
  } catch (error) {
    console.error("Error obteniendo videos:", error);
    return { error: "Error obteniendo videos" };
  }
}
