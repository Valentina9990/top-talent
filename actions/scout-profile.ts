"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ScoutProfileSchema } from "@/schemas";
import * as z from "zod";

export const getScoutProfile = async (userId?: string) => {
  try {
    const session = await auth();
    const targetUserId = userId || session?.user?.id;

    if (!targetUserId) {
      return null;
    }

    const scoutProfile = await prisma.scoutProfile.findUnique({
      where: { userId: targetUserId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        department: true,
        city: true,
      },
    });

    return scoutProfile;
  } catch (error) {
    console.error("Error fetching scout profile:", error);
    return null;
  }
};

export const updateScoutProfile = async (values: z.infer<typeof ScoutProfileSchema>) => {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "SCOUT") {
      return { error: "No autorizado" };
    }

    const validated = ScoutProfileSchema.safeParse(values);

    if (!validated.success) {
      return { error: "Campos inválidos" };
    }

    const data = validated.data;

    const existingProfile = await prisma.scoutProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!existingProfile) {
      await prisma.scoutProfile.create({
        data: {
          userId: session.user.id,
          primaryPhone: data.primaryPhone && data.primaryPhone !== "" ? data.primaryPhone : null,
          secondaryPhone:
            data.secondaryPhone && data.secondaryPhone !== "" ? data.secondaryPhone : null,
          departmentId:
            data.departmentId && data.departmentId !== "" ? data.departmentId : null,
          cityId: data.cityId && data.cityId !== "" ? data.cityId : null,
          yearsExperience: typeof data.yearsExperience === "number" ? data.yearsExperience : null,
        },
      });
    } else {
      await prisma.scoutProfile.update({
        where: { userId: session.user.id },
        data: {
          primaryPhone: data.primaryPhone && data.primaryPhone !== "" ? data.primaryPhone : null,
          secondaryPhone:
            data.secondaryPhone && data.secondaryPhone !== "" ? data.secondaryPhone : null,
          departmentId:
            data.departmentId && data.departmentId !== "" ? data.departmentId : null,
          cityId: data.cityId && data.cityId !== "" ? data.cityId : null,
          yearsExperience: typeof data.yearsExperience === "number" ? data.yearsExperience : null,
        },
      });
    }

    return { success: "Perfil de scout actualizado correctamente" };
  } catch (error) {
    console.error("Error updating scout profile:", error);
    return { error: "Error al actualizar el perfil" };
  }
};

