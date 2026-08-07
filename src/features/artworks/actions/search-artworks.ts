"use server";

import { artworksService } from "../services/artworks-service";

export const searchArtworksAction = async (query: string) =>
  artworksService.searchArtworks(query);
