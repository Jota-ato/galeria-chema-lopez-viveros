import { ArtworkRatio } from "@/features/artworks/types/artworks.types";

export const RATIO_MAP: Record<ArtworkRatio, number> = {
  wide: 16 / 9,
  landscape: 4 / 3,
  portrait: 3 / 4,
  vertical: 9 / 16,
};