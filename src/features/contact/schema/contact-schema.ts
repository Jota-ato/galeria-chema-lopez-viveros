import z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, { error: "El nombre es requerido" }),
  email: z.email({ error: "El correo electrónico no es válido" }),
  message: z.string().min(10, { error: "Necesito un poco más de información para ayudarte" }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
