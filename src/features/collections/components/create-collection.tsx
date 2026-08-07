"use client";

import { useCollectionStore } from "../stores/collection-store";
import { CollectionFormCard } from "./collection-form-card";
import { AnimatePresence, motion } from "motion/react";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/shared/components/ui/progress";
import { ArtworkWithImages } from "@/features/artworks/types/artworks.types";
import { AddImages } from "./add-artworks";

export function CreateCollection({
  initialArtworks,
}: {
  initialArtworks: ArtworkWithImages[];
}) {
  const { step, data, setStep } = useCollectionStore();

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
      {step === 2 && data && (
        <AddImages collectionId={data.id} initialArtworks={initialArtworks} />
      )}
    </AnimatePresence>
  );
}
