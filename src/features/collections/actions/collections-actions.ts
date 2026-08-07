"use server";

import { adminAction } from "@/shared/lib/actions";
import {
  CollectionInput,
  collectionSchema,
} from "../schemas/collection-schema";
import { AppError } from "@/shared/lib/errors";
import { collectionsService } from "../services/collections-service";

export const createCollectionAction = adminAction(
  async (data: CollectionInput) => {
    const zodResponse = collectionSchema.safeParse(data);

    if (!zodResponse.success) {
      throw new AppError("Datos inválidos");
    }

    const collection = await collectionsService.createCollection(data);
    return {
      sucess: true,
      message: `Colección ${data.name} creada exitosamente`,
      data: collection,
    };
  },
);

export const addArtworksToCollectionAction = adminAction(
  async (collectionId: string, artworksIds: string[]) => {
    if (!collectionId || !artworksIds.length)
      throw new AppError("Datos inválidos");

    await collectionsService.addArtworksToCollection(collectionId, artworksIds);

    return "Obras agregadas exitosamente a la colección";
  },
);
