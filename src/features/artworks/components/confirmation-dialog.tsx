"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useArtworkStore } from "../stores/artwork-store";
import { Image as ImageIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Heading } from "@/shared/components/typography/heading";
import { SummaryCard } from "./summary-card";
import { ArtworkInput } from "../schema/artwork-schema";
import { ImagesSumary } from "./images-sumary";
import { useState } from "react";
import { Spinner } from "@/shared/components/ui/spinner";
import { showResponse } from "@/shared/lib/client-actions";
import {
  createArtworkAction,
  updateArtworkAction,
} from "../actions/artworks-actions";

function NoImageDialog({ onClose }: { onClose: () => void }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          No puedes subir una obra sin una imagen principal
        </DialogTitle>
        <DialogDescription>
          Agrega al menos una imagen principal
        </DialogDescription>
      </DialogHeader>

      <div
        className="flex flex-col items-center gap-4 cursor-pointer"
        onClick={onClose}
      >
        <Button variant="destructive" size="icon" className="rounded-full p-8">
          <ImageIcon className="size-10" />
        </Button>
        Cierra este diálogo y agrega al menos una imagen
      </div>

      <Button variant="destructive" onClick={onClose}>
        Cerrar
      </Button>
    </>
  );
}

function UploadConfirmationDialog({
  imageUrl,
  extraImages,
  basicInfo,
  artworkSlug,
}: {
  imageUrl: string;
  extraImages: string[];
  basicInfo: ArtworkInput;
  artworkSlug?: string;
}) {
  const isEditing = !!artworkSlug;

  const {
    setConfirmationDialogOpen,
    setBasicInfo,
    setExtraImagesUrl,
    setImageUrl,
  } = useArtworkStore();
  const [isUploading, setIsUploading] = useState(false);

  const uploadArtwork = async () => {
    setIsUploading(true);
    const response = showResponse(
      isEditing
        ? await updateArtworkAction(
            basicInfo,
            { imageUrl, extraImages },
            artworkSlug,
          )
        : await createArtworkAction(basicInfo, { imageUrl, extraImages }),
    );
    setIsUploading(false);

    if (response) {
      if (response.success) {
        setConfirmationDialogOpen(false);
        setBasicInfo(null);
        setImageUrl(null);
        setExtraImagesUrl([]);
      }
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isEditing ? "Editar" : "Publicar"} {basicInfo.title}
        </DialogTitle>
        <DialogDescription>{basicInfo.description}</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <ImagesSumary
          basicInfo={basicInfo}
          imageUrl={imageUrl}
          extraImages={extraImages}
        />

        <div>
          <Heading level={2} className="mb-4 text-left">
            Resumen
          </Heading>
          <SummaryCard basicInfo={basicInfo} />
        </div>
      </div>

      <Button onClick={uploadArtwork} disabled={isUploading}>
        {isUploading ? (
          <span className="flex gap-2">
            <Spinner />
            {isEditing ? "Guardando..." : "Publicando..."}
          </span>
        ) : isEditing ? (
          "Guardar obra"
        ) : (
          "Publicar obra"
        )}
      </Button>
    </>
  );
}

/* ─────────────────────────────────────────────
   3. Dialog contenedor (orquesta los otros 2)
   ───────────────────────────────────────────── */

export function ConfirmationDialog({ artworkSlug }: { artworkSlug?: string }) {
  const {
    confirmationDialogOpen,
    setConfirmationDialogOpen,
    imageUrl,
    extraImagesUrl,
    basicInfo,
  } = useArtworkStore();

  if (!basicInfo) return null;

  const hasImage = !!imageUrl;
  const extraImages = extraImagesUrl ?? [];

  return (
    <Dialog
      open={confirmationDialogOpen}
      onOpenChange={setConfirmationDialogOpen}
    >
      <DialogContent className="max-h-9/10 max-w-2xl! overflow-auto">
        {hasImage ? (
          <UploadConfirmationDialog
            imageUrl={imageUrl!}
            extraImages={extraImages}
            basicInfo={basicInfo}
            artworkSlug={artworkSlug}
          />
        ) : (
          <NoImageDialog onClose={() => setConfirmationDialogOpen(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
