import { Resend } from "resend";
import { render } from "@react-email/render";
import { VerificationEmail } from "./templates/VerificationEmail";
import { ResetPasswordEmail } from "./templates/ResetPasswordEmail";
import { PlayerContactEmail } from "./templates/PlayerContactEmail";
import { ScoutContactConfirmationEmail } from "./templates/ScoutContactConfirmationEmail";

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

interface ContactPlayerEmailParams {
    playerEmail: string;
    playerName: string;
    scoutEmail: string;
    scoutName: string;
    contactMethodLabel: string;
    contactValue: string;
    message: string;
}

export const sendContactPlayerEmails = async (params: ContactPlayerEmailParams) => {
    const {
        playerEmail,
        playerName,
        scoutEmail,
        scoutName,
        contactMethodLabel,
        contactValue,
        message,
    } = params;

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const scoutProfileUrl = `${baseUrl}/scout/${encodeURIComponent(scoutEmail)}`;

    const playerHtml = await render(
        PlayerContactEmail({
            playerName,
            scoutName,
            message,
            contactMethodLabel,
            contactValue,
            scoutProfileUrl,
        })
    );

    const scoutHtml = await render(
        ScoutContactConfirmationEmail({
            scoutName,
            playerName,
            message,
            contactMethodLabel,
            contactValue,
            scoutProfileUrl,
        })
    );

    await resend.emails.send({
        from: EMAIL_FROM,
        to: playerEmail,
        subject: "Has recibido un mensaje de un scout en TopTalent",
        html: playerHtml,
    });

    await resend.emails.send({
        from: EMAIL_FROM,
        to: scoutEmail,
        subject: "Tu mensaje ha sido enviado al jugador en TopTalent",
        html: scoutHtml,
    });
};