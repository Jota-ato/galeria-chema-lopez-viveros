import { cache } from "react";
import { artworksService } from "@/features/artworks/services/artworks-service";

export const getCachedArtwork = cache(
  async (slug: string) => await artworksService.getArtworkBySlug(slug),
);