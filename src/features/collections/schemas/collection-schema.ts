import { collectionStatus } from "@/db/schema";
import z from "zod";

const collectionsStatus = z.enum(collectionStatus.enumValues);

export const collectionSchema = z.object({
  name: z.string().min(1, "El nombre de la colección es requerido"),
  slug: z.string().min(1, "El slug de la colección es requerido"),
  description: z
    .string()
    .min(10, "La descripción de la colección es requerida"),
  status: collectionsStatus,
  banner: z.url().optional().nullable(),
});

export type CollectionInput = z.infer<typeof collectionSchema>;
