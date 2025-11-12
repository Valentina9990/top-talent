"use server";

import { SchoolProfileSchema } from "@/schemas";
import * as z from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const updateSchoolProfile = async (values: z.infer<typeof SchoolProfileSchema>) => {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "No autorizado" };
    }

    const validatedFields = SchoolProfileSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos" };
    }

    try {
        const schoolProfile = await prisma.schoolProfile.findUnique({
            where: { userId: session.user.id },
        });

        if (!schoolProfile) {
            return { error: "Perfil de escuela no encontrado" };
        }

        const { categoryIds, ...profileData } = validatedFields.data;

        // Update profile and categories in a transaction
        await prisma.$transaction(async (tx) => {
            // Update the basic profile data
            await tx.schoolProfile.update({
                where: { userId: session.user.id },
                data: profileData,
            });

            // Update categories relationship if provided
            if (categoryIds) {
                // Disconnect all existing categories
                await tx.schoolProfile.update({
                    where: { userId: session.user.id },
                    data: {
                        categories: {
                            set: [], // Clear all existing relations
                        },
                    },
                });

                // Connect the new categories
                if (categoryIds.length > 0) {
                    await tx.schoolProfile.update({
                        where: { userId: session.user.id },
                        data: {
                            categories: {
                                connect: categoryIds.map(id => ({ id })),
                            },
                        },
                    });
                }
            }
        });

        return { success: "Perfil actualizado exitosamente" };
    } catch (error) {
        console.error("Error updating school profile:", error);
        return { error: "Error al actualizar el perfil" };
    }
};

export const getSchoolProfile = async (userId?: string) => {
    try {
        const session = await auth();
        const targetUserId = userId || session?.user?.id;

        if (!targetUserId) {
            return null;
        }

        const schoolProfile = await prisma.schoolProfile.findUnique({
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
                categories: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return schoolProfile;
    } catch (error) {
        console.error("Error fetching school profile:", error);
        return null;
    }
};

export const getCategories = async () => {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

