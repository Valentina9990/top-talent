import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "SCHOOL") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { schoolId, title, description, mediaUrl, mediaType } = body;

    // Validate required fields
    if (!schoolId || !title || !description) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Verify the school belongs to the user
    const school = await prisma.schoolProfile.findUnique({
      where: { id: schoolId },
      select: { userId: true },
    });

    if (!school || school.userId !== session.user.id) {
      return NextResponse.json(
        { error: "No tienes permiso para crear publicaciones en esta escuela" },
        { status: 403 }
      );
    }

    const post = await prisma.schoolPost.create({
      data: {
        schoolId,
        title,
        description,
        mediaUrl: mediaUrl || null,
        mediaType: mediaType || null,
      },
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
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error) {
    console.error("Error creating school post:", error);
    return NextResponse.json(
      { error: "Error al crear la publicación" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const schoolId = searchParams.get("schoolId");

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

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching school posts:", error);
    return NextResponse.json(
      { error: "Error al obtener las publicaciones" },
      { status: 500 }
    );
  }
}
