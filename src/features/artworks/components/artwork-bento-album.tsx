"use client";

import { BentoCard } from "@/shared/components/ui/bento-grid";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { Plus } from "lucide-react";
import { Artwork } from "../types/artworks.types";
import { RATIO_MAP } from "@/shared/utils/aspect-ration";
import { ComponentType } from "react";
import { ArtworkWrapperProps } from "@/features/collections/components/artwork-wrapper";

interface ArtworkBentoAlbumProps {
  artworks: Artwork[];
  hrefFor?: (artwork: Artwork) => string;
  targetRowHeight?: number;
  spacing?: number;
  admin?: boolean;
  artworkWrapper?: ComponentType<ArtworkWrapperProps>;
  isSelected?: (artwork: Artwork) => boolean;
  onToggleSelect?: (artwork: Artwork) => void;
}

const ADD_CARD_RATIO = 1;

// Wrapper por defecto: exactamente el <div> que había antes.
// Si no se pasa `artworkWrapper`, el comportamiento es idéntico al original.
function DefaultArtworkWrapper({ children, style }: ArtworkWrapperProps) {
  return <div style={style}>{children}</div>;
}

export function ArtworkBentoAlbum({
  artworks,
  hrefFor = (artwork) => `/obras/${artwork.slug}`,
  targetRowHeight = 280,
  spacing = 12,
  admin = false,
  artworkWrapper,
  isSelected,
  onToggleSelect,
}: ArtworkBentoAlbumProps) {
  const Wrapper = artworkWrapper ?? DefaultArtworkWrapper;

  const artworkPhotos = artworks.map((artwork) => {
    const ratio = RATIO_MAP[artwork.aspectRatio];
    return {
      key: artwork.id,
      src: artwork.imageUrl,
      width: ratio * 1000,
      height: 1000,
      isAddCard: false as const,
      artwork,
    };
  });

  const addCardPhoto = {
    key: "__add-artwork__",
    src: "",
    width: ADD_CARD_RATIO * 1000,
    height: 1000,
    isAddCard: true as const,
  };

  const photos = admin ? [addCardPhoto, ...artworkPhotos] : artworkPhotos;

  return (
    <RowsPhotoAlbum
      photos={photos}
      targetRowHeight={targetRowHeight}
      spacing={spacing}
      render={{
        photo: (_, { photo, width, height }) => {
          if (photo.isAddCard) {
            return (
              <div
                key={photo.key}
                style={{ width, height, position: "relative" }}
              >
                <BentoCard
                  href={"/dashboard/obras/publish"}
                  name="Agregar obra"
                  description=""
                  className="relative size-full"
                  Icon={Plus}
                  background={<div className="absolute size-full bg-card" />}
                  cta="Nueva obra"
                />
              </div>
            );
          }

          const { artwork } = photo;
          return (
            <Wrapper
              key={artwork.id}
              style={{ width, height, position: "relative" }}
              selected={isSelected?.(artwork)}
              onToggle={
                onToggleSelect ? () => onToggleSelect(artwork) : undefined
              }
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
            </Wrapper>
          );
        },
      }}
    />
  );
}
