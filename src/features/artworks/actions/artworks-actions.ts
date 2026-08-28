"use server";

import { adminAction } from "@/shared/lib/actions";
import { ArtworkInput, artworkSchema } from "../schema/artwork-schema";
import { AppError } from "@/shared/lib/errors";
import { artworksService } from "../services/artworks-service";

export const createArtworkAction = adminAction(
  async (
    data: ArtworkInput,
    images: {
      imageUrl: string;
      extraImages: string[];
    },
  ) => {
    const zodResponse = artworkSchema.safeParse(data);

    if (!zodResponse.success) {
      throw new AppError("Datos inválidos");
    }

    const artwork = await artworksService.insertArtwork(data, images);
    return {
      success: true,
      message: `Obra ${artwork.title} creada con éxito`,
      data: artwork,
    };
  },
);
export const updateArtworkAction = adminAction(
  async (
    data: ArtworkInput,
    images: {
      imageUrl: string;
      extraImages: string[];
    },
    slug: string,
  ) => {
    const zodResponse = artworkSchema.safeParse(data);

    if (!zodResponse.success) {
      throw new AppError("Datos inválidos");
    }

    const artwork = await artworksService.editArtwork(data, images, slug);
    return {
      success: true,
      message: `Obra ${artwork.title} actualizada con éxito`,
      data: artwork,
    };
  },
);

export const deleteArtworkAction = adminAction(async (slug: string) => {
  await artworksService.deleteArtwork(slug);
  return "Obra eliminada con éxito";
});
