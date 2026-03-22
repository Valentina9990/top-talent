"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const isFavoritePlayer = async (playerId: string) => {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "SCOUT") {
    return { error: "No autorizado" };
  }

  try {
    const scoutProfile = await prisma.scoutProfile.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!scoutProfile) {
      return { error: "Perfil de scout no encontrado" };
    }

    const playerProfile = await prisma.playerProfile.findUnique({
      where: { userId: playerId },
      select: { id: true },
    });

    if (!playerProfile) {
      return { error: "Perfil de jugador no encontrado" };
    }

    const favorite = await prisma.scoutFavoritePlayer.findFirst({
      where: {
        scoutId: scoutProfile.id,
        playerId: playerProfile.id,
      },
    });

    return { success: true, isFavorite: !!favorite };
  } catch (error) {
    console.error("Error comprobando favorito de jugador:", error);
    return { error: "Error al comprobar favorito" };
  }
};

export const toggleFavoritePlayer = async (playerId: string) => {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "SCOUT") {
    return { error: "No autorizado" };
  }

  try {
    const scoutProfile = await prisma.scoutProfile.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!scoutProfile) {
      return { error: "Perfil de scout no encontrado" };
    }

    const playerProfile = await prisma.playerProfile.findUnique({
      where: { userId: playerId },
      select: { id: true },
    });

    if (!playerProfile) {
      return { error: "Perfil de jugador no encontrado" };
    }

    const existing = await prisma.scoutFavoritePlayer.findFirst({
      where: {
        scoutId: scoutProfile.id,
        playerId: playerProfile.id,
      },
    });

    if (existing) {
      await prisma.scoutFavoritePlayer.delete({ where: { id: existing.id } });
      return { success: true, isFavorite: false };
    }

    await prisma.scoutFavoritePlayer.create({
      data: {
        scoutId: scoutProfile.id,
        playerId: playerProfile.id,
      },
    });

    return { success: true, isFavorite: true };
  } catch (error) {
    console.error("Error alternando favorito de jugador:", error);
    return { error: "Error al actualizar favorito" };
  }
};
