"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Artwork } from "../types/artworks.types";
import { useArtworkStore } from "../stores/artwork-store";
import { Button } from "@/shared/components/ui/button";
import { showResponse } from "@/shared/lib/client-actions";
import { deleteArtworkAction } from "../actions/artworks-actions";
import { useState } from "react";
import { redirect } from "next/navigation";

export function DeleteArtworkDialog({ artwork }: { artwork: Artwork }) {
  const { deleteDialogOpen, setDeleteDialogOpen } = useArtworkStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    showResponse(await deleteArtworkAction(artwork.slug));
    setIsDeleting(false);
    redirect("/dashboard/obras");
  };

  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="leading-relaxed">
            ¿Estás seguro de que quieres eliminar la obra "{artwork.title}"?
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente la
            obra de la base de datos.
          </DialogDescription>
        </DialogHeader>
        <DialogClose render={<Button variant="outline" />}>
          Cancelar
        </DialogClose>
        <Button
          variant="destructive"
          disabled={isDeleting}
          onClick={handleDelete}
        >
          Eliminar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
