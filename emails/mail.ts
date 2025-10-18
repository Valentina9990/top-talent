import { Resend } from "resend";
import { VerificationEmail } from "./templates/VerificationEmail";
import { ResetPasswordEmail } from "./templates/ResetPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string, userName?: string) => {
    await resend.emails.send({
        from: process.env.EMAIL_FROM || "sarmientodaniav@gmail.com",
        to: email,
        subject: "Verifica tu correo electrónico",
        react: VerificationEmail({ 
            userName: userName || "Usuario", 
            token 
        }),
    });
}

export const sendPasswordResetEmail = async (email: string, token: string, userName?: string) => {
    await resend.emails.send({
        from: process.env.EMAIL_FROM || "sarmientodaniav@gmail.com",
        to: email,
        subject: "Restablece tu contraseña",
        react: ResetPasswordEmail({ 
            userName: userName || "Usuario", 
            token 
        }),
    });
}