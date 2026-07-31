import { ArtworkRatio } from "@/features/artworks/types/artworks.types";

export const RATIO_MAP: Record<ArtworkRatio, number> = {
  wide: 16 / 9,
  landscape: 4 / 3,
  portrait: 3 / 4,
  vertical: 9 / 16,
  square: 1,
};

export const TRANSLATED_RATIO_MAP: Record<ArtworkRatio, string> = {
  wide: "Ancho",
  landscape: "Paisaje",
  portrait: "Retrato",
  vertical: "Vertical",
  square: "Cuadrado",
}

/**
 * Given a width and height, this function returns the closest aspect ratio key from RATIO_MAP.
 * @param width - The width of the artwork.
 * @param height - The height of the artwork.
 * @returns The closest aspect ratio key from RATIO_MAP.
 */
export function getClosestAspectRatio(
  width: number,
  height: number,
): ArtworkRatio {
  const ratio = width / height;

  let closestKey: ArtworkRatio = "wide";
  let smallestDiff = Infinity;

  for (const [key, value] of Object.entries(RATIO_MAP) as [
    ArtworkRatio,
    number,
  ][]) {
    const diff = Math.abs(ratio - value);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestKey = key;
    }
  }

  return closestKey;
}
