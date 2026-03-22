"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ContactPlayerSchema } from "@/schemas";
import { sendContactPlayerEmails } from "@/emails/mail";

export type ContactMethod = "EMAIL" | "PRIMARY_PHONE" | "SECONDARY_PHONE";

export const contactPlayer = async (values: {
  playerId: string;
  message: string;
  contactMethod: ContactMethod;
}) => {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "SCOUT") {
    return { error: "No autorizado" };
  }

  const parsed = ContactPlayerSchema.safeParse(values);

  if (!parsed.success) {
    return { error: "Datos inválidos" };
  }

  const { playerId, message, contactMethod } = parsed.data;

  try {
    const [playerUser, scoutProfile] = await Promise.all([
      prisma.user.findUnique({
        where: { id: playerId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      }),
      prisma.scoutProfile.findUnique({
        where: { userId: session.user.id },
        select: {
          fullName: true,
          primaryPhone: true,
          secondaryPhone: true,
        },
      }),
    ]);

    if (!playerUser || playerUser.role !== "PLAYER") {
      return { error: "Jugador no encontrado" };
    }

    if (!playerUser.email) {
      return { error: "El jugador no tiene un correo válido" };
    }

    if (!scoutProfile) {
      return { error: "Debes completar tu perfil de scout para poder contactar jugadores" };
    }

    if (!session.user.email) {
      return { error: "Tu cuenta no tiene un correo válido" };
    }

    let contactMethodLabel: string;
    let contactValue: string | null = null;

    switch (contactMethod) {
      case "EMAIL":
        contactMethodLabel = "Correo electrónico";
        contactValue = session.user.email;
        break;
      case "PRIMARY_PHONE":
        contactMethodLabel = "Teléfono principal";
        contactValue = scoutProfile.primaryPhone || null;
        break;
      case "SECONDARY_PHONE":
        contactMethodLabel = "Teléfono secundario";
        contactValue = scoutProfile.secondaryPhone || null;
        break;
      default:
        return { error: "Método de contacto no válido" };
    }

    if (!contactValue) {
      return { error: "El método de contacto seleccionado no está configurado en tu perfil" };
    }

    const scoutName = scoutProfile.fullName || session.user.name || "Scout";
    const playerName = playerUser.name || "Jugador";

    await sendContactPlayerEmails({
      playerEmail: playerUser.email,
      playerName,
      scoutEmail: session.user.email,
      scoutName,
      contactMethodLabel,
      contactValue,
      message,
    });

    return { success: "Mensaje enviado correctamente al jugador" };
  } catch (error) {
    console.error("Error al contactar al jugador:", error);
    return { error: "Ocurrió un error al enviar el mensaje" };
  }
};
