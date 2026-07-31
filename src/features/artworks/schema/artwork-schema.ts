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
    description: z.string().optional(),
    price: z
      .number()
      .min(0, { error: "El precio debe ser un número positivo" }),
    width: z.number().min(1, { error: "El ancho debe ser un número positivo" }),
    height: z
      .number()
      .min(1, { error: "La altura debe ser un número positivo" }),
    aspectRatio,
    imageUrl: z.url({ error: "La imagen es necesaria" }),
    fullResolutionImageUrl: z.url().optional(),
    extraImagesUrl: z.array(z.url()).optional(),
    status,
  })
  .refine(
    (data) => {
      const expectedRatio = RATIO_MAP[data.aspectRatio];
      const actualRatio = data.width / data.height;
      return Math.abs(actualRatio - expectedRatio) < 0.1;
    },
    {
      message:
        "La proporción de la obra no coincide con el ancho y alto proporcionados",
      path: ["aspectRatio"],
    },
  );

export type ArtworkInput = z.infer<typeof artworkSchema>;
