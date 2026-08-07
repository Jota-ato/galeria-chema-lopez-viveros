"use client";

import { useCollectionStore } from "../stores/collection-store";
import { CollectionFormCard } from "./collection-form-card";
import { AnimatePresence, motion } from "motion/react";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/shared/components/ui/progress";
import { Artwork } from "@/features/artworks/types/artworks.types";
import { ArtworkInfiniteScroll } from "@/features/artworks/components/artworks-infinite-scroll";
import { ArtworkWrapper } from "./artwork-wrapper";
import { Button } from "@/shared/components/ui/button";
import { SaveIcon } from "lucide-react";
import { SearchBar } from "@/shared/components/ui/search-bar";

export function CreateCollection({
  initialArtworks,
}: {
  initialArtworks: Artwork[];
}) {
  const { step, data, setStep, imagesUrl, addImageUrl, removeImageUrl } =
    useCollectionStore();

  if (step !== 1 && data === null) {
    setStep(1);
  }

  return (
    <AnimatePresence>
      <div key="header" className="bg-card p-4 rounded-md">
        <Progress value={((step - 1) / 2) * 100}>
          <ProgressLabel>Paso {step} de 2</ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>
      {step === 1 && (
        <motion.div
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CollectionFormCard />
        </motion.div>
      )}
      {step === 2 && (
        <>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeIn", delay: 0.3 }}
          className="p-4 bg-card rounded-md flex gap-4 justify-between items-center flex-col md:flex-row"
        >
          <Button
            size="lg"
            className="w-full md:w-auto"
          >
            <SaveIcon className="size-4" />
            Guardar obras
          </Button>
          <SearchBar className="w-full md:w-auto" />
        </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20, }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeIn", delay: 0.8 }}
            className="p-4 bg-card rounded-md"
          >
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
