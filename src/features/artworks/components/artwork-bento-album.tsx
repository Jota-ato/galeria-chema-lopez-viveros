"use client";

import { BentoCard } from "@/shared/components/ui/bento-grid";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { Artwork } from "../types/artworks.types";
import { RATIO_MAP } from "@/shared/utils/aspect-ration";

interface ArtworkBentoAlbumProps {
  artworks: Artwork[];
  hrefFor?: (artwork: Artwork) => string;
  targetRowHeight?: number;
  spacing?: number;
}

export function ArtworkBentoAlbum({
  artworks,
  hrefFor = (artwork) => `/obras/${artwork.slug}`,
  targetRowHeight = 280,
  spacing = 12,
}: ArtworkBentoAlbumProps) {
  const photos = artworks.map((artwork) => {
    const ratio = RATIO_MAP[artwork.aspectRatio];
    return {
      key: artwork.id,
      src: artwork.imageUrl,
      width: ratio * 1000,
      height: 1000,
      artwork,
    };
  });

  return (
    <RowsPhotoAlbum
      photos={photos}
      targetRowHeight={targetRowHeight}
      spacing={spacing}
      render={{
        photo: (_, { photo, width, height }) => {
          const { artwork } = photo;
          return (
            <div
              key={artwork.id}
              style={{ width, height, position: "relative" }}
            >
              <BentoCard
                href={hrefFor(artwork)}
                name={artwork.title}
                description=""
                className="relative border size-full"
                background={
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat mask-b-from-20% mask-b-to-90%"
                    style={{ backgroundImage: `url('${artwork.imageUrl}')` }}
                  />
                }
                cta="Ver obra"
              />
            </div>
          );
        },
      }}
    />
  );
}
