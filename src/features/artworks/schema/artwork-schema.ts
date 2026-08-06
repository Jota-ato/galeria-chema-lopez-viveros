import { artworksStatus, aspectRatio as dbAspectRatio } from "@/db/schema";
import { RATIO_MAP } from "@/shared/utils/aspect-ration";
import z from "zod";

export const aspectRatio = z.enum(dbAspectRatio.enumValues, {
  error: "La proporción de la obra es obligatoria",
});
export const status = z.enum(artworksStatus.enumValues, {
  error: "El estado de la obra es obligatorio",
});

export const artworkSchema = z
  .object({
    title: z.string().min(1, { error: "El título es obligatorio" }),
    description: z.string().optional().nullable(),
    price: z
      .number({ error: "El precio debe ser un número válido" })
      .min(0, { error: "El precio debe ser un número positivo" }),
    width: z
      .number({ error: "El ancho debe ser un entero" })
      .int({ error: "El ancho debe ser un entero" })
      .min(1, { error: "El ancho debe ser un número positivo" }),
    height: z
      .number({ error: "El alto debe ser un número" })
      .int({ error: "El precio debe ser un entero" })
      .min(1, { error: "La altura debe ser un número positivo" }),
    aspectRatio,
    fullResolutionImageUrl: z.string().optional().nullable(),
    status,
  })
  .refine(
    (data) => {
      const expectedRatio = RATIO_MAP[data.aspectRatio];
      const actualRatio = data.width / data.height;
      return Math.abs(actualRatio - expectedRatio) < 0.01;
    },
    {
      message:
        "La proporción de la obra no coincide con el ancho y alto proporcionados",
      path: ["aspectRatio"],
    },
  );

export type ArtworkInput = z.infer<typeof artworkSchema>;
