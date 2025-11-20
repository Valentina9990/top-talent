"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/emails/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Usuario no encontrado" };
    }

    // VERIFICACIÓN POR CORREO TEMPORALMENTE DESHABILITADA
    // if(!existingUser.emailVerified) {
    //     const verificationToken = await generateVerificationToken(existingUser.email);
    //     await sendVerificationEmail(
    //             verificationToken.email, 
    //             verificationToken.token
    //         );
    //         
    //     return { success: "Verifica tu correo para iniciar sesión" };
    // }

    try {
        const redirectTo = existingUser.role === "SCHOOL" 
            ? "/dashboard-escuela" 
            : DEFAULT_LOGIN_REDIRECT;

        await signIn("credentials", {
            email,
            password,
            redirectTo,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Credenciales inválidas" };
                default:
                    return { error: "Algo salió mal" };
            }
        }

        throw error;
    }
}