import { Resend } from "resend";
import { render } from "@react-email/render";
import { VerificationEmail } from "./templates/VerificationEmail";
import { ResetPasswordEmail } from "./templates/ResetPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_FROM = process.env.EMAIL_FROM || "onboarding@resend.dev";

export const sendVerificationEmail = async (email: string, token: string, userName?: string) => {
    const emailHtml = await render(
        VerificationEmail({ 
            userName: userName || "Usuario", 
            token 
        })
    );

    await resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject: "Verifica tu correo electrónico",
        html: emailHtml,
    });
}

export const sendPasswordResetEmail = async (email: string, token: string, userName?: string) => {
    const emailHtml = await render(
        ResetPasswordEmail({ 
            userName: userName || "Usuario", 
            token 
        })
    );

    await resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject: "Restablece tu contraseña",
        html: emailHtml,
    });
}