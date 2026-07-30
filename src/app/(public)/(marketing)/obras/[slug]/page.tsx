import { artworksService } from "@/features/artworks/services/artworks-service";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { RATIO_MAP } from "@/shared/utils/aspect-ration";
import { formatPrice } from "@/shared/utils/price";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const artwork = await artworksService.getArtworkBySlug(slug);

  if (!artwork) notFound();

  const ratio = RATIO_MAP[artwork.aspectRatio];

  return (
    <div className="space-y-4">
      <Heading>{artwork.title}</Heading>

      <section className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div>
          <Image
            src={artwork.imageUrl}
            alt={`Imagen de la obra ${artwork.title}`}
            width={ratio * 1000}
            height={1000}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p>{artwork.description}</p>
          <Separator />
          <Heading className="text-left" level={2}>
            Precio
          </Heading>
          <p>{formatPrice(artwork.price)}</p>
          <Separator />
          <Button
            render={
              <a
                href={`https://wa.me/${process.env.ARTIST_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            nativeButton={false}
          >
            Comprar obra
          </Button>
        </div>
      </section>
    </div>
  );
}
