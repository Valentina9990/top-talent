import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "El correo electrónico es requerido"
  }),
  password: z.string().min(1, {
    message: "La contraseña es requerida"
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "El correo electrónico debe ser válido"
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres"
  }),
  confirmPassword: z.string().min(6, {
    message: "La confirmación de contraseña es requerida"
  }),
  name: z.string().min(1, {
    message: "El nombre es requerido"
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "El correo electrónico es requerido"
  })
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres"
  }),
});

export const PlayerProfileSchema = z.object({
  avatarUrl: z.url({
    message: "Debe ser una URL válida"
  }).optional().or(z.literal("")),
  team: z.string().min(1, {
    message: "El nombre del equipo es requerido"
  }).optional().or(z.literal("")),
  zone: z.string().min(1, {
    message: "La zona es requerida"
  }).optional().or(z.literal("")),
  bio: z.string().max(500, {
    message: "La biografía no puede exceder 500 caracteres"
  }).optional().or(z.literal("")),
  preferredFoot: z.enum(["RIGHT", "LEFT", "BOTH"], {
    message: "Selecciona una opción válida"
  }).optional().or(z.literal("")),
  positionIds: z.array(z.string()).optional(),
  categoryId: z.string().min(1, {
    message: "Selecciona una categoría"
  }).optional().or(z.literal("")),
  goals: z.number().min(0, {
    message: "Los goles deben ser un número positivo"
  }).optional().or(z.literal(0)),
  assists: z.number().min(0, {
    message: "Las asistencias deben ser un número positivo"
  }).optional().or(z.literal(0)),
  matchesPlayed: z.number().min(0, {
    message: "Los partidos jugados deben ser un número positivo"
  }).optional().or(z.literal(0)),
  profileVideoUrl: z.string().url({
    message: "Debe ser una URL válida"
  }).optional().or(z.literal("")),
});

export const PlayerVideoSchema = z.object({
  url: z.url({
    message: "Debe ser una URL válida de video"
  }).min(1, {
    message: "La URL del video es requerida"
  }),
  title: z.string().max(100, {
    message: "El título no puede exceder 100 caracteres"
  }).optional().or(z.literal("")),
  description: z.string().max(300, {
    message: "La descripción no puede exceder 300 caracteres"
  }).optional().or(z.literal("")),
});

export const PlayerAchievementSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, {
    message: "El título del logro es requerido"
  }).max(100, {
    message: "El título no puede exceder 100 caracteres"
  }),
  description: z.string().max(300, {
    message: "La descripción no puede exceder 300 caracteres"
  }).optional().or(z.literal("")),
  date: z.date().optional(),
});
