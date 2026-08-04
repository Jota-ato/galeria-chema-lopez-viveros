import { ArtworkImage } from "@/features/artworks/components/artwork-image";
import { ImagesCarousel } from "@/features/artworks/components/images-carousel";
import { artworksService } from "@/features/artworks/services/artworks-service";
import { Container } from "@/shared/components/layout/container";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { RATIO_MAP } from "@/shared/utils/aspect-ration";
import { generateMetadataTitle } from "@/shared/utils/metadata";
import { formatPrice } from "@/shared/utils/price";
import { generateWhatsappMessageLink } from "@/shared/utils/whatsapp";
import { notFound } from "next/navigation";
import { cache } from "react";

const getCachedArtwork = cache(
  async (slug: string) => await artworksService.getArtworkBySlug(slug),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const artwork = await getCachedArtwork(slug);

  if (!artwork) notFound();

  const ratio = RATIO_MAP[artwork.aspectRatio];
  const title = generateMetadataTitle(artwork.title);
  const description =
    artwork.description ?? "Obra de arte en la galería de Chema López Viveros";

  return {
    title,
    description,
    alternates: {
      canonical: `/obras/${artwork.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/obras/${artwork.slug}`,
      images: [
        {
          url: artwork.imageUrl,
          width: Math.round(ratio * 1000),
          height: 1000,
          alt: `Imagen de la obra ${artwork.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [artwork.imageUrl],
    },
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const artwork = await getCachedArtwork(slug);

  if (!artwork) notFound();

  const ratio = RATIO_MAP[artwork.aspectRatio];

  const contactMessage = `Hola, estoy interesado en la obra "${artwork.title}" que vi en la galería de Chema López Viveros. ¿Podrías darme más información sobre ella?`;

  return (
    <Container className="space-y-4">
      <Heading>{artwork.title}</Heading>

      <section className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div>
          {artwork.images.length ? (
            <ImagesCarousel artwork={artwork} />
          ) : (
            <ArtworkImage ratio={ratio} image={artwork.imageUrl} />
          )}
        </div>
        <div className="flex flex-col gap-4 flex-1">
          {artwork.description && (
            <>
              <p>{artwork.description}</p>
              <Separator />
            </>
          )}
          {artwork.fullResolutionImageUrl && (
            <Button
              variant="link"
              render={
                <a
                  href={artwork.fullResolutionImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              nativeButton={false}
            >
              Ver imagen en resolución completa
            </Button>
          )}
          <Heading className="text-left" level={2}>
            Precio
          </Heading>
          <p>{formatPrice(artwork.price)}</p>
          <Separator />
          <Button
            render={
              <a
                href={generateWhatsappMessageLink(contactMessage)}
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
    </Container>
  );
}
