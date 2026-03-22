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
export const getScoutDashboardData = async () => {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "SCOUT") {
    return { error: "No autorizado" };
  }

  try {
    const scoutProfile = await prisma.scoutProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        contactedPlayers: {
          include: {
            player: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
                category: true,
                positions: true,
                primaryPosition: true,
                department: true,
                city: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        favoritePlayers: {
          include: {
            player: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                  },
                },
                category: true,
                positions: true,
                primaryPosition: true,
                department: true,
                city: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!scoutProfile) {
      return { error: "Perfil de scout no encontrado" };
    }

    const contactedPlayers = scoutProfile.contactedPlayers.map((cp) => ({
      id: cp.player.user?.id,
      name: cp.player.user?.name,
      image: cp.player.user?.image,
      category: cp.player.category?.name ?? "Sin categoría",
      primaryPosition: cp.player.primaryPosition?.name ?? (cp.player.positions[0]?.name ?? "Sin posición"),
      goals: cp.player.goals,
      assists: cp.player.assists,
      matchesPlayed: cp.player.matchesPlayed,
      department: cp.player.department?.name ?? null,
      city: cp.player.city?.name ?? null,
      contactedAt: cp.createdAt,
    }));

    const favoritePlayers = scoutProfile.favoritePlayers.map((fp) => ({
      id: fp.player.user?.id,
      name: fp.player.user?.name,
      image: fp.player.user?.image,
      category: fp.player.category?.name ?? "Sin categoría",
      primaryPosition: fp.player.primaryPosition?.name ?? (fp.player.positions[0]?.name ?? "Sin posición"),
      goals: fp.player.goals,
      assists: fp.player.assists,
      matchesPlayed: fp.player.matchesPlayed,
      department: fp.player.department?.name ?? null,
      city: fp.player.city?.name ?? null,
      favoritedAt: fp.createdAt,
    }));

    // Estadísticas básicas
    const totalContacted = contactedPlayers.length;
    const totalFavorites = favoritePlayers.length;

    // Jugadores por categoría (contactados)
    const categoryCounts: Record<string, number> = {};
    contactedPlayers.forEach((p) => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });
    const contactedByCategory = Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count,
    }));

    // Jugadores favoritos por posición principal
    const positionCounts: Record<string, number> = {};
    favoritePlayers.forEach((p) => {
      positionCounts[p.primaryPosition] = (positionCounts[p.primaryPosition] || 0) + 1;
    });
    const favoritesByPosition = Object.entries(positionCounts).map(([name, count]) => ({
      name,
      count,
    }));

    // Goles totales de jugadores favoritos (top 5)
    const topFavoritesByGoals = [...favoritePlayers]
      .sort((a, b) => (b.goals || 0) - (a.goals || 0))
      .slice(0, 5)
      .map((p) => ({
        name: p.name || "Sin nombre",
        goals: p.goals || 0,
      }));

    // Distribución geográfica (departamentos) de jugadores contactados
    const departmentCounts: Record<string, number> = {};
    contactedPlayers.forEach((p) => {
      const key = p.department || "Sin departamento";
      departmentCounts[key] = (departmentCounts[key] || 0) + 1;
    });
    const contactedByDepartment = Object.entries(departmentCounts).map(([name, count]) => ({
      name,
      count,
    }));

    return {
      success: true,
      contactedPlayers,
      favoritePlayers,
      stats: {
        totalContacted,
        totalFavorites,
        contactedByCategory,
        favoritesByPosition,
        topFavoritesByGoals,
        contactedByDepartment,
      },
    };
  } catch (error) {
    console.error("Error obteniendo datos del panel del scout:", error);
    return { error: "Error al cargar los datos del panel" };
  }
};
