import prisma from "@/lib/prisma";

/**
 * Creates a new user and automatically creates a PlayerProfile if the role is PLAYER
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
    }

    return newUser;
  });
}
