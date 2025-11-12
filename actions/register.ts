"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/emails/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { createUserWithProfile } from "@/lib/user-helpers";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos" };
    }

    const { email, password, name, role } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Correo en uso" };
    }

    await createUserWithProfile({
        email,
        password: hashedPassword,
        name,
        role: role as "PLAYER" | "SCHOOL",
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
        verificationToken.email, 
        verificationToken.token
    );

    return { success: "Se ha enviado un correo de verificación" };
}

 