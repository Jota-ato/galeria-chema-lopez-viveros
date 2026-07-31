"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useArtworkStore } from "../stores/artwork-store";
import { useArtworkImageUpload } from "../hooks/use-artwork-image-upload";
import { UploadTile } from "./upload-tile";

interface ArtworkImagesProps {
  initialImageUrl?: string | null;
  initialExtraImagesUrl?: string[];
}

export function ArtworkImages({
  initialImageUrl,
  initialExtraImagesUrl,
}: ArtworkImagesProps) {
  const {
    imageUrl,
    setImageUrl,
    extraImagesUrl,
    setExtraImagesUrl,
    addExtraImageUrl,
    removeExtraImageUrl,
  } = useArtworkStore();

  // Hydrate the store from the initial props exactly once, then reset it
  // on unmount so a fresh mount of this form never inherits stale images.
  useEffect(() => {
    if (initialImageUrl) setImageUrl(initialImageUrl);
    if (initialExtraImagesUrl?.length) setExtraImagesUrl(initialExtraImagesUrl);

    return () => {
      setImageUrl(null);
      setExtraImagesUrl(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { startUpload: startMainUpload, isUploading: isMainUploading } =
    useArtworkImageUpload({
      logLabel: "imagen principal",
      onSuccess: ([url]) => {
        if (url) setImageUrl(url);
      },
    });

  const { startUpload: startExtraUpload, isUploading: isExtraUploading } =
    useArtworkImageUpload({
      logLabel: "imágenes extra",
      onSuccess: (urls) => urls.forEach(addExtraImageUrl),
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vista previa</CardTitle>
      </CardHeader>
      <CardContent>
        <article className="flex flex-col gap-4">
          <header>Imagen principal</header>
          <main>
            <UploadTile
              id="artwork-main-image"
              variant="main"
              label="Agregar imagen"
              isUploading={isMainUploading}
              onFilesSelected={([file]) => file && startMainUpload([file])}
            >
              {imageUrl && (
                <div className="relative h-full w-full">
                  <Image
                    src={imageUrl}
                    alt="Imagen principal"
                    fill
                    className="object-cover"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-2 hidden items-center justify-center group-hover:flex"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setImageUrl(null);
                    }}
                  >
                    <X />
                  </Button>
                </div>
              )}
            </UploadTile>
          </main>

          <p>Imágenes extra</p>

          <footer className="flex max-w-lg gap-4 overflow-x-auto">
            <UploadTile
              id="artwork-extra-images"
              variant="compact"
              multiple
              label="Agregar imagen extra"
              isUploading={isExtraUploading}
              onFilesSelected={(files) => startExtraUpload(files)}
            />
            {(extraImagesUrl ?? []).map((url) => (
              <ExtraImageThumbnail
                key={url}
                url={url}
                onRemove={() => removeExtraImageUrl(url)}
              />
            ))}
          </footer>
        </article>
      </CardContent>
    </Card>
  );
}

function ExtraImageThumbnail({
  url,
  onRemove,
}: {
  url: string;
  onRemove: () => void;
}) {
  return (
    <div className="group relative h-24 w-32 shrink-0 border">
      <Image src={url} alt="Imagen extra" fill className="object-cover" />
      <button
        type="button"
        onClick={onRemove}
        aria-label="Eliminar imagen"
        className="absolute right-1 top-1 rounded-full bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <X className="size-3" />
      </button>
    </div>
  );
}
