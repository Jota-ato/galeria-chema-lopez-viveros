// app/dashboard/obras/page.tsx
"use client"; // react-photo-album mide el contenedor en cliente

import { Heading } from "@/shared/components/typography/heading";
import { BentoCard } from "@/shared/components/ui/bento-grid";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { PenSquare, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

type ArtworkRatio = "wide" | "landscape" | "portrait";

const RATIO_MAP: Record<ArtworkRatio, number> = {
  wide: 16 / 9,
  landscape: 4 / 3,
  portrait: 3 / 4,
};

interface Artwork {
  id: string;
  name: string;
  img: string;
  ratio: ArtworkRatio;
}

const artworks: Artwork[] = [
  { id: "1", name: "Obra 1", img: "/img/artwork1.jpeg", ratio: "wide" },
  { id: "2", name: "Obra 2", img: "/img/artwork2.jpeg", ratio: "landscape" },
  { id: "3", name: "Obra 3", img: "/img/artwork3.jpeg", ratio: "portrait" },
  { id: "4", name: "Obra 4", img: "/img/artwork4.jpeg", ratio: "portrait" },
  { id: "5", name: "Obra 5", img: "/img/artwork5.jpeg", ratio: "wide" },
];

const photos = artworks.map((a) => {
  const ratio = RATIO_MAP[a.ratio];
  return {
    key: a.id,
    src: a.img,
    width: ratio * 1000,
    height: 1000,
    artwork: a,
  };
});

export default function ArtworksPage() {
  return (
    <>
      <Heading>Obras</Heading>

      <Card>
        <CardHeader>
          <CardTitle>
            Nueva obra
          </CardTitle>
          <CardDescription>
            Publica una nueva obra en la galería
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            Agregar obra <Plus className="size-4" />
          </Button>
        </CardContent>
      </Card>

      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={280}
        spacing={12}
        render={{
          photo: (_, { photo, width, height }) => {
            const { artwork } = photo;
            return (
              <div style={{ width, height, position: "relative" }}>
                <BentoCard
                  href={`/dashboard/obras`}
                  name={artwork.name}
                  description="Editar una obra existente"
                  className="relative border size-full"
                  background={
                    <div
                      className="absolute size-full top-0 left-0 bg-cover bg-center bg-no-repeat mask-b-from-10%"
                      style={{ backgroundImage: `url('${artwork.img}')` }}
                    />
                  }
                  cta="Editar"
                />
              </div>
            );
          },
        }}
      />

      <div className="flex justify-end mt-6">
        <a href="?page=2" className="btn">
          Siguiente página
        </a>
      </div>
    </>
  );
}
