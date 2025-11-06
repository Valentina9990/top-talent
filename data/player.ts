import prisma from "@/lib/prisma";

export interface PlayerFilters {
  name?: string;
  position?: string;
  ageRange?: string;
  zone?: string;
}

export async function getPlayers(filters?: PlayerFilters) {
  try {
    const whereClause: any = {
      playerProfile: {
        isNot: null,
      },
      role: "PLAYER",
    };

    if (filters?.name) {
      whereClause.name = {
        contains: filters.name,
        mode: "insensitive",
      };
    }

    if (filters?.zone) {
      whereClause.playerProfile = {
        ...whereClause.playerProfile,
        zone: {
          contains: filters.zone,
          mode: "insensitive",
        },
      };
    }

    let filteredPlayers = await prisma.user.findMany({
      where: whereClause,
      include: {
        playerProfile: {
          include: {
            positions: true,
            category: true,
            videos: {
              orderBy: {createdAt: "desc"},
            },
            achievements: {
              orderBy: {createdAt: "desc"},
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (filters?.position && filters.position !== "") {
      filteredPlayers = filteredPlayers.filter((player) =>
        player.playerProfile?.positions.some(
          (pos) => pos.name === filters.position
        )
      );
    }

    if (filters?.ageRange && filters.ageRange !== "") {
      filteredPlayers = filteredPlayers.filter((player) => {
        const category = player.playerProfile?.category;
        if (!category) return false;

        if (filters.ageRange === "15-16 años") {
          return category.minAge === 15 && category.maxAge === 16;
        } else if (filters.ageRange === "17-18 años") {
          return category.minAge === 17 && category.maxAge === 18;
        } else if (filters.ageRange === "+18 años") {
          return (category.minAge || 0) >= 18;
        }
        return true;
      });
    }

    return filteredPlayers;
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
}

export async function getPositions() {
  try {
    return await prisma.position.findMany({
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
}

