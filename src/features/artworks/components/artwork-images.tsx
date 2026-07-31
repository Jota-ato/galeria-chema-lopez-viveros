"use client";

import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Plus, Loader2, X } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import Image from "next/image";
import { useArtworkStore } from "../stores/artwork-store";
import { Button } from "@/shared/components/ui/button";
import { compressImage } from "@/lib/image-compression";

interface ArtworkImagesProps {
  initialImageUrl?: string | null;
  initialExtraImagesUrl?: string[];
}

export function ArtworkImages({
  initialImageUrl,
  initialExtraImagesUrl,
}: ArtworkImagesProps) {
  const mainInputRef = useRef<HTMLInputElement>(null);
  const extraInputRef = useRef<HTMLInputElement>(null);

  const {
    imageUrl,
    setImageUrl,
    setExtraImagesUrl,
    extraImagesUrl,
    addExtraImageUrl,
    removeExtraImageUrl,
  } = useArtworkStore();
  useEffect(() => {
    if (initialImageUrl) setImageUrl(initialImageUrl);
    if (initialExtraImagesUrl?.length) setExtraImagesUrl(initialExtraImagesUrl);

    return () => {
      setImageUrl(null);
      setExtraImagesUrl(null);
    };
  }, []);

  const { startUpload: startMainUpload, isUploading: isMainUploading } =
    useUploadThing("imageUploader", {
      onBeforeUploadBegin: async (files) => {
        return Promise.all(files.map((file) => compressImage(file)));
      },
      onClientUploadComplete: (res) => {
        if (res?.[0]) setImageUrl(res[0].ufsUrl);
      },
      onUploadError: (error) => {
        console.error("Error subiendo imagen principal:", error);
      },
    });

  const { startUpload: startExtraUpload, isUploading: isExtraUploading } =
    useUploadThing("imageUploader", {
      onBeforeUploadBegin: async (files) => {
        return Promise.all(files.map((file) => compressImage(file)));
      },
      onClientUploadComplete: (res) => {
        res?.forEach((f) => addExtraImageUrl(f.ufsUrl));
      },
      onUploadError: (error) => {
        console.error("Error subiendo imágenes extra:", error);
      },
    });

  function handleMainFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) startMainUpload([file]);
    e.target.value = "";
  }

  function handleExtraFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) startExtraUpload(files);
    e.target.value = "";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vista previa</CardTitle>
      </CardHeader>
      <CardContent>
        <article className="flex flex-col gap-4">
          <header>Imagen principal</header>
          <main>
            <input
              ref={mainInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleMainFileSelect}
            />
            <div
              className="relative w-full min-h-60 md:h-80 border border-dashed flex flex-col gap-6 items-center justify-center group hover:bg-muted hover:text-primary transition-colors duration-300 cursor-pointer overflow-hidden"
              onClick={() => mainInputRef.current?.click()}
            >
              {isMainUploading ? (
                <Loader2 className="size-8 animate-spin" />
              ) : imageUrl ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={imageUrl}
                    alt="Imagen principal"
                    fill
                    className="object-cover"
                  />
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    className="absolute top-2 right-2 hidden group-hover:flex items-center justify-center"
                    onClick={() => setImageUrl(null)}
                  >
                    <X />
                  </Button>
                </div>
              ) : (
                <>
                  <Plus className="size-8 group-hover:text-primary group-hover:stroke-2 transition-all duration-300" />
                  <span className="text-xl group-hover:font-bold transition-all duration-300">
                    Agregar imagen
                  </span>
                </>
              )}
            </div>
          </main>

          <footer className="flex gap-4 max-w-lg overflow-x-auto">
            {(extraImagesUrl ?? []).map((url) => (
              <div
                key={url}
                className="relative h-24 w-32 border shrink-0 group"
              >
                <Image
                  src={url}
                  alt="Imagen extra"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeExtraImageUrl(url)}
                  className="absolute top-1 right-1 bg-background/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}

            <input
              ref={extraInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleExtraFileSelect}
            />
            <div
              aria-label="Agregar imagen extra"
              className="h-24 w-32 shrink-0 border border-dashed flex flex-col gap-2 items-center justify-center group hover:bg-muted hover:text-primary transition-colors duration-300 cursor-pointer"
              onClick={() => extraInputRef.current?.click()}
            >
              {isExtraUploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Plus className="size-4 group-hover:size-6 group-hover:text-primary group-hover:stroke-2 transition-all duration-300" />
              )}
            </div>
          </footer>
        </article>
      </CardContent>
    </Card>
  );
}
