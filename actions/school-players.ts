"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSchoolPlayers() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autenticado" };
    }

    const schoolProfile = await prisma.schoolProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!schoolProfile) {
      return { error: "Perfil de escuela no encontrado" };
    }

    const players = await prisma.playerProfile.findMany({
      where: {
        schoolId: schoolProfile.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        positions: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, players };
  } catch (error) {
    console.error("Error fetching school players:", error);
    return { error: "Error al obtener jugadores" };
  }
}

export async function addPlayerToSchool(playerEmail: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autenticado" };
    }

    const schoolProfile = await prisma.schoolProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!schoolProfile) {
      return { error: "Perfil de escuela no encontrado" };
    }

    const playerUser = await prisma.user.findUnique({
      where: { email: playerEmail },
    });

    if (!playerUser) {
      return { error: "Jugador no encontrado con ese email" };
    }

    if (playerUser.role !== "PLAYER") {
      return { error: "El usuario no es un jugador" };
    }

    let playerProfile = await prisma.playerProfile.findUnique({
      where: { userId: playerUser.id },
    });

    if (!playerProfile) {
      playerProfile = await prisma.playerProfile.create({
        data: {
          userId: playerUser.id,
        },
      });
    }

    if (playerProfile.schoolId && playerProfile.schoolId !== schoolProfile.id) {
      return { error: "El jugador ya pertenece a otra escuela" };
    }

    await prisma.playerProfile.update({
      where: { id: playerProfile.id },
      data: {
        schoolId: schoolProfile.id,
        schoolVerified: true,
      },
    });

    revalidatePath("/dashboard-escuela/jugadores");
    return { success: "Jugador agregado exitosamente" };
  } catch (error) {
    console.error("Error adding player to school:", error);
    return { error: "Error al agregar jugador" };
  }
}

export async function removePlayerFromSchool(playerId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autenticado" };
    }

    const schoolProfile = await prisma.schoolProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!schoolProfile) {
      return { error: "Perfil de escuela no encontrado" };
    }

    const playerProfile = await prisma.playerProfile.findUnique({
      where: { id: playerId },
    });

    if (!playerProfile || playerProfile.schoolId !== schoolProfile.id) {
      return { error: "Jugador no encontrado o no pertenece a esta escuela" };
    }

    await prisma.playerProfile.update({
      where: { id: playerId },
      data: {
        schoolId: null,
        schoolVerified: false,
      },
    });

    revalidatePath("/dashboard-escuela/jugadores");
    return { success: "Jugador removido exitosamente" };
  } catch (error) {
    console.error("Error removing player from school:", error);
    return { error: "Error al remover jugador" };
  }
}

export async function updateSchoolPlayerData(
  playerId: string,
  data: {
    categoryId?: string;
    positionIds?: string[];
    preferredFoot?: string;
    goals?: number;
    assists?: number;
    matchesPlayed?: number;
  }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "No autenticado" };
    }

    const schoolProfile = await prisma.schoolProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!schoolProfile) {
      return { error: "Perfil de escuela no encontrado" };
    }

    const playerProfile = await prisma.playerProfile.findUnique({
      where: { id: playerId },
    });

    if (!playerProfile || playerProfile.schoolId !== schoolProfile.id) {
      return { error: "Jugador no encontrado o no pertenece a esta escuela" };
    }

    await prisma.$transaction(async (tx) => {
      await tx.playerProfile.update({
        where: { id: playerId },
        data: {
          categoryId: data.categoryId || null,
          preferredFoot: data.preferredFoot || null,
          goals: data.goals ?? playerProfile.goals,
          assists: data.assists ?? playerProfile.assists,
          matchesPlayed: data.matchesPlayed ?? playerProfile.matchesPlayed,
        },
      });

      if (data.positionIds !== undefined) {
        await tx.playerProfile.update({
          where: { id: playerId },
          data: {
            positions: {
              set: [],
            },
          },
        });

        if (data.positionIds.length > 0) {
          await tx.playerProfile.update({
            where: { id: playerId },
            data: {
              positions: {
                connect: data.positionIds.map((id) => ({ id })),
              },
            },
          });
        }
      }
    });

    revalidatePath("/dashboard-escuela/jugadores");
    return { success: "Datos actualizados exitosamente" };
  } catch (error) {
    console.error("Error updating player data:", error);
    return { error: "Error al actualizar datos" };
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
    return { error: "Error al obtener posiciones" };
  }
}
