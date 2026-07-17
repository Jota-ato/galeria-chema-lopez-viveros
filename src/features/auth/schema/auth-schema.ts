import { z } from "zod";

export const authSchema = z.object({
    email: z.email({error: "Por favor, ingresa un correo electrónico válido."}),
    password: z.string().min(6, {error: "La contraseña debe tener al menos 6 caracteres."})
})

export type AuthInput = z.infer<typeof authSchema>;