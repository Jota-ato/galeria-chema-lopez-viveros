"use server";

import { artworksService } from "../services/artworks-service";

export async function getMoreArtworks(page: number, limit: number) {
  return await artworksService.getLastArtworks(limit, page);
}
