"use server";

import { getPlayers, PlayerFilters } from "@/data/player";

export async function searchPlayers(filters: PlayerFilters) {
  try {
    const players = await getPlayers(filters);
    return { success: true, players };
  } catch (error) {
    console.error("Error searching players:", error);
    return { error: "Error al buscar jugadores" };
  }
}

