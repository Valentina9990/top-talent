"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreatePostData {
  schoolId: string;
  title: string;
  description: string;
  mediaUrl?: string | null;
  mediaType?: string | null;
}

export async function createSchoolPost(data: CreatePostData) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "SCHOOL") {
      return { error: "No autorizado" };
    }

    // Verify the school belongs to the user
    const school = await prisma.schoolProfile.findUnique({
      where: { id: data.schoolId },
      select: { userId: true },
    });

    if (!school || school.userId !== session.user.id) {
      return { error: "No tienes permiso para crear publicaciones en esta escuela" };
    }

    const post = await prisma.schoolPost.create({
      data: {
        schoolId: data.schoolId,
        title: data.title,
        description: data.description,
        mediaUrl: data.mediaUrl || null,
        mediaType: data.mediaType || null,
      },
    });

    revalidatePath("/dashboard-escuela");
    revalidatePath("/para-escuelas");

    return { success: true, post };
  } catch (error) {
    console.error("Error creating school post:", error);
    return { error: "Error al crear la publicación" };
  }
}

export async function getSchoolPosts(schoolId?: string) {
  try {
    const posts = await prisma.schoolPost.findMany({
      where: schoolId ? { schoolId } : undefined,
      include: {
        school: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, posts };
  } catch (error) {
    console.error("Error fetching school posts:", error);
    return { success: false, error: "Error al obtener las publicaciones" };
  }
}

export async function deleteSchoolPost(postId: string) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "SCHOOL") {
      return { error: "No autorizado" };
    }

    // Verify the post belongs to the user's school
    const post = await prisma.schoolPost.findUnique({
      where: { id: postId },
      include: {
        school: {
          select: { userId: true },
        },
      },
    });

    if (!post || post.school.userId !== session.user.id) {
      return { error: "No tienes permiso para eliminar esta publicación" };
    }

    await prisma.schoolPost.delete({
      where: { id: postId },
    });

    revalidatePath("/dashboard-escuela");
    revalidatePath("/para-escuelas");

    return { success: true };
  } catch (error) {
    console.error("Error deleting school post:", error);
    return { error: "Error al eliminar la publicación" };
  }
}
