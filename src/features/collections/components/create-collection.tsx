"use client";

import { useCollectionStore } from "../stores/collection-store";
import { CollectionFormCard } from "./collection-form-card";
import {
    AnimatePresence,
    motion
} from "motion/react"

export function CreateCollection() {
  const { step, data, setStep } = useCollectionStore();

    if (step !== 1 && data === null) {
        setStep(1);
    }

  return (
    <AnimatePresence>
      {step === 1 && (
        <motion.div
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <CollectionFormCard />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
