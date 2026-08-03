"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArtworkBentoAlbum } from "./artwork-bento-album";
import { Artwork } from "../types/artworks.types";
import { getMoreArtworks } from "../actions/get-more-art-works";

const LIMIT = 5;

interface Props {
  initialArtworks: Artwork[];
}

export function ArtworkInfiniteScroll({ initialArtworks }: Props) {
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
      { rootMargin: "100px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <>
      <ArtworkBentoAlbum artworks={artworks} />

      <div ref={sentinelRef} className="h-10" />

      {isLoading && (
        <p className="text-center text-sm text-muted-foreground py-4">
          Cargando más obras...
        </p>
      )}
    </>
  );
}
