import prisma from "@/lib/prisma";

/**
 * Creates a new user and automatically creates:
 * - a PlayerProfile if the role is PLAYER
 * - a SchoolProfile if the role is SCHOOL
 * - a ScoutProfile if the role is SCOUT
 */
export async function createUserWithProfile(data: {
  email: string;
  password: string;
  name: string;
  role: "PLAYER" | "ADMIN" | "SCHOOL" | "SCOUT";
  image?: string | null;
}) {
  return await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
        image: data.image,
      },
    });

    if (newUser.role === "PLAYER") {
      await tx.playerProfile.create({
        data: {
          userId: newUser.id,
        },
      });
    } else if (newUser.role === "SCHOOL") {
      await tx.schoolProfile.create({
        data: {
          userId: newUser.id,
          officialName: data.name, // Use the name as initial official name
        },
      });
    } else if (newUser.role === "SCOUT") {
      await tx.scoutProfile.create({
        data: {
          userId: newUser.id,
          fullName: data.name,
        },
      });
    }

    return newUser;
  });
}
