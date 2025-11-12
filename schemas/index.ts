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
  role: z.enum(["PLAYER", "SCHOOL"], {
    message: "Selecciona un tipo de cuenta válido"
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

export const SchoolProfileSchema = z.object({
  officialName: z.string().min(1, {
    message: "El nombre oficial de la escuela es requerido"
  }).max(200, {
    message: "El nombre no puede exceder 200 caracteres"
  }).optional().or(z.literal("")),
  nit: z.string().max(50, {
    message: "El NIT no puede exceder 50 caracteres"
  }).optional().or(z.literal("")),
  description: z.string().max(1000, {
    message: "La descripción no puede exceder 1000 caracteres"
  }).optional().or(z.literal("")),
  mission: z.string().max(500, {
    message: "La misión no puede exceder 500 caracteres"
  }).optional().or(z.literal("")),
  vision: z.string().max(500, {
    message: "La visión no puede exceder 500 caracteres"
  }).optional().or(z.literal("")),
  logoUrl: z.string().url({
    message: "Debe ser una URL válida"
  }).optional().or(z.literal("")),
  department: z.string().max(100, {
    message: "El departamento no puede exceder 100 caracteres"
  }).optional().or(z.literal("")),
  city: z.string().max(100, {
    message: "La ciudad no puede exceder 100 caracteres"
  }).optional().or(z.literal("")),
  address: z.string().max(200, {
    message: "La dirección no puede exceder 200 caracteres"
  }).optional().or(z.literal("")),
  phone: z.string().max(20, {
    message: "El teléfono no puede exceder 20 caracteres"
  }).optional().or(z.literal("")),
  contactEmail: z.string().email({
    message: "Debe ser un correo válido"
  }).optional().or(z.literal("")),
  facebookUrl: z.string().url({
    message: "Debe ser una URL válida"
  }).optional().or(z.literal("")),
  instagramUrl: z.string().url({
    message: "Debe ser una URL válida"
  }).optional().or(z.literal("")),
  websiteUrl: z.string().url({
    message: "Debe ser una URL válida"
  }).optional().or(z.literal("")),
  categoryIds: z.array(z.string()).optional(),
  approximatePlayers: z.number().min(0, {
    message: "El número de jugadores debe ser positivo"
  }).optional(),
  headCoachName: z.string().max(100, {
    message: "El nombre no puede exceder 100 caracteres"
  }).optional().or(z.literal("")),
  achievements: z.string().max(1000, {
    message: "Los logros no pueden exceder 1000 caracteres"
  }).optional().or(z.literal("")),
});

