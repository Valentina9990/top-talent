"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface PlayerProfileData {
  avatarUrl?: string;
  team?: string;
  zone?: string;
  bio?: string;
  preferredFoot?: string;
  positionIds?: string[];
  categoryId?: string;
  goals?: number;
  assists?: number;
  matchesPlayed?: number;
  profileVideoUrl?: string;
}

async function getOrCreateProfile(userId: string) {
  let profile = await prisma.playerProfile.findUnique({
    where: { userId },
  });

  if (!profile) {
    profile = await prisma.playerProfile.create({
      data: { userId },
    });
  }

  return profile;
}

export async function getPlayerProfile(userId?: string) {
  try {
    const session = await auth();
    const targetUserId = userId || session?.user?.id;

    if (!targetUserId) {
      return { error: "No autenticado" };
    }

    const profile = await prisma.playerProfile.findUnique({
      where: { userId: targetUserId },
      include: {
        positions: true,
        category: true,
        videos: {
          orderBy: { createdAt: "desc" },
        },
        achievements: {
          orderBy: { createdAt: "desc" },
        },
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return { success: true, profile };
  } catch (error) {
    console.error("Error fetching player profile:", error);
    return { error: "Error al obtener el perfil" };
  }
}

export async function updatePlayerProfile(data: PlayerProfileData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autenticado" };
    }

    const userId = session.user.id; // Store in variable to ensure TypeScript knows it's defined

    const existingProfile = await prisma.playerProfile.findUnique({
      where: { userId },
    });

    let profile;

    if (existingProfile) {
      profile = await prisma.$transaction(async (tx) => {
        const updated = await tx.playerProfile.update({
          where: { userId },
          data: {
            avatarUrl: data.avatarUrl || null,
            team: data.team || null,
            zone: data.zone || null,
            bio: data.bio || null,
            preferredFoot: data.preferredFoot || null,
            categoryId: data.categoryId && data.categoryId !== "" ? data.categoryId : null,
            goals: data.goals,
            assists: data.assists,
            matchesPlayed: data.matchesPlayed,
            profileVideoUrl: data.profileVideoUrl || null,
          },
        });

        if (data.positionIds) {
          await tx.playerProfile.update({
            where: { userId },
            data: {
              positions: {
                set: [],
              },
            },
          });

          if (data.positionIds.length > 0) {
            await tx.playerProfile.update({
              where: { userId },
              data: {
                positions: {
                  connect: data.positionIds.map((id: string) => ({ id })),
                },
              },
            });
          }
        }

        return updated;
      });
    } else {
      profile = await prisma.$transaction(async (tx) => {
        const created = await tx.playerProfile.create({
          data: {
            userId,
            avatarUrl: data.avatarUrl || null,
            team: data.team || null,
            zone: data.zone || null,
            bio: data.bio || null,
            preferredFoot: data.preferredFoot || null,
            categoryId: data.categoryId && data.categoryId !== "" ? data.categoryId : null,
            goals: data.goals || 0,
            assists: data.assists || 0,
            matchesPlayed: data.matchesPlayed || 0,
            profileVideoUrl: data.profileVideoUrl || null,
          },
        });

        if (data.positionIds && data.positionIds.length > 0) {
          await tx.playerProfile.update({
            where: { userId },
            data: {
              positions: {
                connect: data.positionIds.map((id: string) => ({ id })),
              },
            },
          });
        }

        return created;
      });
    }

    revalidatePath("/perfil");
    return { success: "Perfil actualizado correctamente", profile };
  } catch (error) {
    console.error("Error updating player profile:", error);
    return { error: "Error al actualizar el perfil" };
  }
}

export async function addPlayerVideo(videoUrl: string, title?: string, description?: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autenticado" };
    }

    const profile = await getOrCreateProfile(session.user.id);

    const video = await prisma.playerVideo.create({
      data: {
        playerId: profile.id,
        videoUrl,
        title,
        description,
      },
    });

    revalidatePath("/perfil");
    return { success: "Video agregado correctamente", video };
  } catch (error) {
    console.error("Error adding video:", error);
    return { error: "Error al agregar el video" };
  }
}

export async function deletePlayerVideo(videoId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autenticado" };
    }

    const video = await prisma.playerVideo.findUnique({
      where: { id: videoId },
      include: { player: true },
    });

    if (!video || video.player.userId !== session.user.id) {
      return { error: "No autorizado" };
    }

    await prisma.playerVideo.delete({
      where: { id: videoId },
    });

    revalidatePath("/perfil");
    return { success: "Video eliminado correctamente" };
  } catch (error) {
    console.error("Error deleting video:", error);
    return { error: "Error al eliminar el video" };
  }
}

export async function addPlayerAchievement(title: string, description?: string, date?: Date) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autenticado" };
    }

    const profile = await getOrCreateProfile(session.user.id);

    const achievement = await prisma.playerAchievement.create({
      data: {
        playerId: profile.id,
        title,
        description,
        date,
      },
    });

    revalidatePath("/perfil");
    return { success: "Logro agregado correctamente", achievement };
  } catch (error) {
    console.error("Error adding achievement:", error);
    return { error: "Error al agregar el logro" };
  }
}

export async function deletePlayerAchievement(achievementId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autenticado" };
    }

    const achievement = await prisma.playerAchievement.findUnique({
      where: { id: achievementId },
      include: { player: true },
    });

    if (!achievement || achievement.player.userId !== session.user.id) {
      return { error: "No autorizado" };
    }

    await prisma.playerAchievement.delete({
      where: { id: achievementId },
    });

    revalidatePath("/perfil");
    return { success: "Logro eliminado correctamente" };
  } catch (error) {
    console.error("Error deleting achievement:", error);
    return { error: "Error al eliminar el logro" };
  }
}

export async function updatePlayerAchievement(
  achievementId: string,
  title: string,
  description?: string,
  date?: Date
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autenticado" };
    }

    const achievement = await prisma.playerAchievement.findUnique({
      where: { id: achievementId },
      include: { player: true },
    });

    if (!achievement || achievement.player.userId !== session.user.id) {
      return { error: "No autorizado" };
    }

    const updated = await prisma.playerAchievement.update({
      where: { id: achievementId },
      data: {
        title,
        description,
        date,
      },
    });

    revalidatePath("/perfil");
    return { success: "Logro actualizado correctamente", achievement: updated };
  } catch (error) {
    console.error("Error updating achievement:", error);
    return { error: "Error al actualizar el logro" };
  }
}

export async function getPositions() {
  try {
    const positions = await prisma.position.findMany({
      orderBy: { name: "asc" },
    });

    return { success: true, positions };
  } catch (error) {
    console.error("Error fetching positions:", error);
    return { error: "Error al obtener las posiciones" };
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return { success: true, categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Error al obtener las categorías" };
  }
}

