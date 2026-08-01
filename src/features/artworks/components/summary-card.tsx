import { ArtworkInput } from "../schema/artwork-schema";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { TRANSLATE_STATUS_MAP } from "../utils/status";
import { Link2, Palette, Tag } from "lucide-react";
import { TRANSLATED_RATIO_MAP } from "@/shared/utils/aspect-ration";
import { formatPrice } from "@/shared/utils/price";

export function SummaryCard({ basicInfo }: { basicInfo: ArtworkInput }) {
  const formattedPrice = formatPrice(basicInfo.price);
  const formattedDimensions = `${basicInfo.width} x ${basicInfo.height} cm`;

  return (
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
            <Badge variant="secondary">
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
  );
}
