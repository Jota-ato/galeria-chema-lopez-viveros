"use client";

import { useCollectionStore } from "../stores/collection-store";
import { CollectionFormCard } from "./collection-form-card";
import { AnimatePresence, motion } from "motion/react";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/shared/components/ui/progress";
import { Artwork } from "@/features/artworks/types/artworks.types";
import { AddArtworks } from "./add-artworks";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { FullCollection } from "../types/collections.types";
import { useEffect } from "react";

export function CreateCollection({
  initialArtworks,
  collection,
}: {
  initialArtworks: Artwork[];
  collection?: FullCollection | null;
}) {
  const isEditting = !!collection;
  const { step, data, setData, setArtworks, setStep, reset } = useCollectionStore();



  const value = step === 3 ? 100 : ((step - 1) / 2) * 100;



  useEffect(() => {
    if (collection) {
      setData(collection);
      setArtworks(collection.artworks ?? []);
    }
    if (step !== 1 && data === null) {
      setStep(1);
    }
    if (step === 3) {
      reset();
    }
  }, [collection, setData, setArtworks]);

  return (
    <AnimatePresence>
      <div key="header" className="bg-card p-4 rounded-md">
        <Progress value={value}>
          <ProgressLabel>Paso {step === 3 ? 2 : step} de 2</ProgressLabel>
          <ProgressValue />
        </Progress>
        <div className="w-full flex items-center justify-end mt-4">
          {step === 2 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ChevronLeft className="size-4" />
              Regresar
            </Button>
          )}
        </div>
      </div>
      {step === 1 && (
        <motion.div
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CollectionFormCard isEditting={isEditting} />
        </motion.div>
      )}
      {step === 2 && data && (
        <AddArtworks isEditing={isEditting} collectionId={data.id} initialArtworks={initialArtworks} />
      )}
    </AnimatePresence>
  );
}
