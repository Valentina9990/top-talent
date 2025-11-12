import prisma from "@/lib/prisma";

/**
 * Creates a new user and automatically creates a PlayerProfile if the role is PLAYER
 * or SchoolProfile if the role is SCHOOL
 */
export async function createUserWithProfile(data: {
  email: string;
  password: string;
  name: string;
  role: "PLAYER" | "ADMIN" | "SCHOOL";
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
    }

    return newUser;
  });
}
