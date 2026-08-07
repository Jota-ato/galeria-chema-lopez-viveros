"use client";
import { ArtworkWrapper } from "./artwork-wrapper";
import { Button } from "@/shared/components/ui/button";
import { SaveIcon } from "lucide-react";
import { SearchBar } from "@/shared/components/ui/search-bar";
import { ArtworkInfiniteScroll } from "@/features/artworks/components/artworks-infinite-scroll";
import { motion } from "motion/react";
import { ArtworkWithImages } from "@/features/artworks/types/artworks.types";
import { useCollectionStore } from "../stores/collection-store";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { searchArtworksAction } from "@/features/artworks/actions/search-artworks";
import { ArtworkBentoAlbum } from "@/features/artworks/components/artwork-bento-album";

export function AddImages({
  initialArtworks,
}: {
  initialArtworks: ArtworkWithImages[];
}) {
  const { setStep, imagesUrl, addImageUrl, removeImageUrl } =
    useCollectionStore();

  const [searchedArtworks, setSearchedArtworks] = useState<ArtworkWithImages[]>(
    [],
  );
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  useEffect(() => {
    const fetchArtworks = async () => {
      if (!debouncedQuery.trim()) {
        setSearchedArtworks([]);
        return;
      }
      setSearchedArtworks(await searchArtworksAction(debouncedQuery));
    };

    fetchArtworks();
  }, [debouncedQuery]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeIn", delay: 0.3 }}
        className="p-4 bg-card rounded-md flex gap-4 justify-between items-center flex-col md:flex-row"
      >
        <Button size="lg" className="w-full md:w-auto">
          <SaveIcon className="size-4" />
          Guardar obras
        </Button>
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="buscar obra"
          className="w-full md:w-auto"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeIn", delay: 0.8 }}
        className="p-4 bg-card rounded-md"
      >
        {searchedArtworks.length ? (
          <ArtworkBentoAlbum
            artworks={searchedArtworks}
            artworkWrapper={ArtworkWrapper}
            isSelected={(artwork) => imagesUrl.includes(artwork.imageUrl)}
            onToggleSelect={(artwork) =>
              imagesUrl.includes(artwork.imageUrl)
                ? removeImageUrl(artwork.imageUrl)
                : addImageUrl(artwork.imageUrl)
            }
          />
        ) : (
          <ArtworkInfiniteScroll
            initialArtworks={initialArtworks}
            artworkWrapper={ArtworkWrapper}
            isSelected={(artwork) => imagesUrl.includes(artwork.imageUrl)}
            onToggleSelect={(artwork) =>
              imagesUrl.includes(artwork.imageUrl)
                ? removeImageUrl(artwork.imageUrl)
                : addImageUrl(artwork.imageUrl)
            }
          />
        )}
      </motion.div>
    </>
  );
}
