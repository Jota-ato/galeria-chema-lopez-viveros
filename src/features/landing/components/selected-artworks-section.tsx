import { Container } from "@/shared/components/layout/container";
import { Heading } from "@/shared/components/typography/heading";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { selectedArtworksService } from "@/features/artworks/services/selected-artworks-service";
import { formatPrice } from "@/shared/utils/price";
import {
  ArtworkStatus,
  TRANSLATE_STATUS_MAP,
} from "@/features/artworks/utils/status";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { ArtworkRatio } from "@/features/artworks/types/artworks.types";
import { Title } from "@/shared/components/public/title";

const aspectClass: Record<ArtworkRatio, string> = {
  wide: "aspect-[21/9]",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  vertical: "aspect-[2/3]",
  square: "aspect-square",
};

const statusStyle: Record<ArtworkStatus, string> = {
  on_sale: "border-stone-300 text-stone-700",
  reserved: "border-amber-300 text-amber-700",
  sold: "border-stone-300 text-stone-400 line-through decoration-1",
  exhibition_only: "border-stone-300 text-stone-500",
};

export async function SelectedArtworksSection() {
  const artworks = await selectedArtworksService.getFeaturedArtworks(true);

  return (
    <section id="selected-artworks" className="py-20 md:py-32 bg-stone-50">
      <Container>
        <Title
          className="flex flex-col gap-2 mb-16 md:mb-24"
          textAbove="Piezas seleccionadas"
        >
          <Heading level={2} className="font-serif text-4xl md:text-5xl">
            Obras individuales
          </Heading>
        </Title>

        <div className="flex flex-col gap-24 md:gap-32">
          {artworks.map((artwork, index) => {
            const cycle = index % 3;

            if (cycle === 2) {
              return (
                <article
                  key={artwork.artwork.id}
                  className="flex flex-col gap-6"
                >
                  <div
                    className={cn(
                      "relative w-full overflow-hidden rounded-sm",
                      aspectClass[artwork.artwork.aspectRatio],
                    )}
                  >
                    <Image
                      src={artwork.artwork.imageUrl}
                      alt={artwork.artwork.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-center text-center gap-3 max-w-xl mx-auto">
                    <Title
                      textAbove={`Obra ${String(index + 1).padStart(2, "0")}`}
                      textBelow={artwork.artwork.description!}
                    >
                      <Heading level={3} className="font-serif italic text-3xl">
                        {artwork.artwork.title}
                      </Heading>
                    </Title>

                    <div className="flex flex-col items-left gap-4 mt-1">
                      <div className="flex gap-6 items-center">
                        <span
                          className={cn(
                            "text-xs uppercase tracking-wide px-2 py-1 rounded-full border",
                            statusStyle[artwork.artwork.status],
                          )}
                        >
                          {TRANSLATE_STATUS_MAP[artwork.artwork.status]}
                        </span>
                        {artwork.artwork.status === "on_sale" && (
                          <span className="text-sm text-stone-700 font-medium">
                            {formatPrice(artwork.artwork.price)}
                          </span>
                        )}
                      </div>
                      <Button
                        nativeButton={false}
                        render={
                          <Link href={`/obras/${artwork.artwork.slug}`} />
                        }
                      >
                        Ver más
                      </Button>
                    </div>
                  </div>
                </article>
              );
            }

            const isReversed = cycle === 1;

            return (
              <article
                key={artwork.artwork.id}
                className={cn(
                  "flex flex-col gap-6 md:gap-12 md:items-center",
                  isReversed ? "md:flex-row-reverse" : "md:flex-row",
                )}
              >
                <div
                  className={cn(
                    "relative w-full md:w-3/5 overflow-hidden rounded-sm shrink-0",
                    aspectClass[artwork.artwork.aspectRatio],
                  )}
                >
                  <Image
                    src={artwork.artwork.imageUrl}
                    alt={artwork.artwork.title}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className={cn(
                    "flex flex-col gap-4 md:w-2/5",
                    isReversed
                      ? "md:items-end md:text-right"
                      : "md:items-start",
                  )}
                >
                  <Title
                    textAbove={`Obra ${String(index + 1).padStart(2, "0")}`}
                    textBelow={artwork.artwork.description!}
                  >
                    <Heading level={3} className="font-serif italic text-3xl">
                      {artwork.artwork.title}
                    </Heading>
                  </Title>
                  <div className="flex flex-col items-left gap-4 mt-2">
                    <div className="flex gap-6 items-center">
                      <span
                        className={cn(
                          "text-xs uppercase tracking-wide px-2 py-1 rounded-full border",
                          statusStyle[artwork.artwork.status],
                        )}
                      >
                        {TRANSLATE_STATUS_MAP[artwork.artwork.status]}
                      </span>
                      {artwork.artwork.status === "on_sale" && (
                        <span className="text-sm text-stone-700 font-medium">
                          {formatPrice(artwork.artwork.price)}
                        </span>
                      )}
                    </div>
                    <Button
                      nativeButton={false}
                      render={<Link href={`/obras/${artwork.artwork.slug}`} />}
                    >
                      Ver más
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
