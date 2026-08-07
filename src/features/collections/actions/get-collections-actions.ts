"use server";

import { adminAction } from "@/shared/lib/actions";
import { collectionsService } from "../services/collections-service";

export const getAllCollectionsAction = adminAction(
  async (limit: number, page: number) => {
    const collections = await collectionsService.getAllCollections(limit, page);

    return collections;
  },
);
