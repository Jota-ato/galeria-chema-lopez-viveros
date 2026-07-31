"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useArtworkStore } from "../stores/artwork-store";
import { Image as ImageIcon, Link2, Palette, Ruler, Tag } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import { RATIO_MAP, TRANSLATED_RATIO_MAP } from "@/shared/utils/aspect-ration";
import { Heading } from "@/shared/components/typography/heading";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { TRANSLATE_STATUS_MAP } from "../utils/status";

function formatNumber(value: number) {
  return new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 2,
  }).format(value);
}

export function ConfirmationDialog() {
  const {
    confirmationDialogOpen,
    setConfirmationDialogOpen,
    imageUrl,
    extraImagesUrl,
    basicInfo,
  } = useArtworkStore();

  if (!basicInfo) return null;
  const ratio = RATIO_MAP[basicInfo.aspectRatio];
  const formattedPrice = formatNumber(basicInfo.price);
  const formattedDimensions = `${formatNumber(basicInfo.width)} x ${formatNumber(
    basicInfo.height,
  )} cm`;
  const extraImages = extraImagesUrl ?? [];

  return (
    <Dialog
      open={confirmationDialogOpen}
      onOpenChange={setConfirmationDialogOpen}
    >
      <DialogContent className="max-h-9/10 max-w-2xl! overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {imageUrl
              ? `Subir ${basicInfo.title}`
              : "No puedes subir una obra sin una imagen principal"}
          </DialogTitle>
          <DialogDescription>
            {imageUrl
              ? basicInfo.description
              : "Agrega al menos una imagen principal"}
          </DialogDescription>
        </DialogHeader>
        {!imageUrl ? (
          <div
            className="flex flex-col items-center gap-4 cursor-pointer"
            onClick={() => setConfirmationDialogOpen(false)}
          >
            <Button
              variant="destructive"
              size="icon"
              className="rounded-full p-8"
            >
              <ImageIcon className="size-10" />
            </Button>
            Cierra este diálogo y agrega al menos una imagen
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <div>
                <Image
                  src={imageUrl}
                  alt={basicInfo.title}
                  width={ratio * 1000}
                  height={1000}
                  className="object-cover size-full rounded-lg shrink-0"
                />
              </div>
              <div className="flex gap-2 overflow-auto">
                {extraImages.length > 0
                  ? extraImages.map((url) => (
                      <Image
                        key={url}
                        src={url}
                        alt={basicInfo.title}
                        width={100}
                        height={100}
                        className="object-cover h-24 w-32 rounded-lg shrink-0"
                      />
                    ))
                  : null}
              </div>
            </div>
            <div>
              <Heading level={2} className="mb-4 text-left">
                Resumen
              </Heading>
              <Card>
                <CardContent className="space-y-4 py-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1 rounded-xl bg-background/80 p-4 ring-1 ring-foreground/5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Tag className="size-4" />
                        Título
                      </div>
                      <p className="text-lg font-semibold leading-tight">
                        {basicInfo.title}
                      </p>
                    </div>
                    <div className="space-y-1 rounded-xl bg-background/80 p-4 ring-1 ring-foreground/5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Palette className="size-4" />
                        Estado
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        {TRANSLATE_STATUS_MAP[basicInfo.status]}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Precio</p>
                      <p className="text-base font-medium">{formattedPrice}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Medidas</p>
                      <p className="text-base font-medium">{formattedDimensions}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Proporción</p>
                      <p className="text-base font-medium">
                        {TRANSLATED_RATIO_MAP[basicInfo.aspectRatio]}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Descripción</p>
                    <p className="rounded-xl bg-background/80 p-4 text-sm leading-6 text-foreground ring-1 ring-foreground/5">
                      {basicInfo.description?.trim() || "Sin descripción"}
                    </p>
                  </div>

                  {basicInfo.fullResolutionImageUrl ? (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Link2 className="size-4" />
                          Imagen en alta resolución
                        </p>
                        <a
                          href={basicInfo.fullResolutionImageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="break-all rounded-xl bg-background/80 p-4 text-sm text-primary ring-1 ring-foreground/5 transition-colors hover:bg-background"
                        >
                          {basicInfo.fullResolutionImageUrl}
                        </a>
                      </div>
                    </>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        <Button variant={imageUrl ? "default" : "destructive"}>
            {imageUrl ? "Subir obra" : "Cerrar"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
