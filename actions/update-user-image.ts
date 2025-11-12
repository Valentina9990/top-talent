"use server";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function updateUserImage(imageUrl: string) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return { error: "Usuario no autenticado" };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { image: imageUrl },
    });

    return { success: "Imagen actualizada correctamente" };
  } catch (error) {
    console.error("Error updating user image:", error);
    return { error: "Error al actualizar la imagen" };
  }
}
