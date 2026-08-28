"use client";
import { Button } from "@/shared/components/ui/button";
import { Trash } from "lucide-react";
import { useArtworkStore } from "../stores/artwork-store";

export function DeleteArtworkbutton({ slug }: { slug: string }) {
  const { setDeleteDialogOpen } = useArtworkStore();

  return (
    <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
      <Trash />
      Eliminar obra
    </Button>
  );
}
