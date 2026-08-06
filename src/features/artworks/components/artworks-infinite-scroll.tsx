"use client";

import { ComponentType, useCallback, useEffect, useRef, useState } from "react";
import { ArtworkBentoAlbum } from "./artwork-bento-album";
import { Artwork } from "../types/artworks.types";
import { getMoreArtworks } from "../actions/get-more-art-works";
import { ArtworkWrapperProps } from "@/features/collections/components/artwork-wrapper";

const LIMIT = 5;

export function ArtworkInfiniteScroll({
  initialArtworks,
  artworkWrapper,
  isSelected,
  onToggleSelect,
}: {
  initialArtworks: Artwork[];
  artworkWrapper?: ComponentType<ArtworkWrapperProps>;
  isSelected?: (artwork: Artwork) => boolean;
  onToggleSelect?: (artwork: Artwork) => void;
}) {
  const [artworks, setArtworks] = useState(initialArtworks);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialArtworks.length === LIMIT);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    const nextPage = page + 1;
    const newArtworks = await getMoreArtworks(nextPage, LIMIT);

    setArtworks((prev) => [...prev, ...newArtworks]);
    setPage(nextPage);
    setHasMore(newArtworks.length === LIMIT);
    setIsLoading(false);
  }, [page, hasMore, isLoading]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "250px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <>
      <ArtworkBentoAlbum
        artworks={artworks}
        artworkWrapper={artworkWrapper}
        isSelected={isSelected}
        onToggleSelect={onToggleSelect}
      />

      <div ref={sentinelRef} className="h-10" />

      {isLoading && (
        <p className="text-center text-sm text-muted-foreground py-4">
          Cargando más obras...
        </p>
      )}
    </>
  );
}
