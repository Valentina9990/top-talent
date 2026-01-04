import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { VerificationEmail } from "./templates/VerificationEmail";
import { ResetPasswordEmail } from "./templates/ResetPasswordEmail";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export const sendVerificationEmail = async (email: string, token: string, userName?: string) => {
    const emailHtml = await render(
        VerificationEmail({ 
            userName: userName || "Usuario", 
            token 
        })
    );

    await transporter.sendMail({
        from: `"Pegasight" <${process.env.GMAIL_USER}>`,
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

    await transporter.sendMail({
        from: `"Pegasight" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Restablece tu contraseña",
        html: emailHtml,
    });
}