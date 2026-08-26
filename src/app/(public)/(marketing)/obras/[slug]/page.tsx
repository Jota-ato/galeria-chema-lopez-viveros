import { ArtworkImage } from "@/features/artworks/components/artwork-image";
import { ArtworkNotFound } from "@/features/artworks/components/artwork-not-found";
import { ImagesCarousel } from "@/features/artworks/components/images-carousel";
import { requireAuth } from "@/lib/auth-server";
import { Container } from "@/shared/components/layout/container";
import { Heading } from "@/shared/components/typography/heading";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { RATIO_MAP } from "@/shared/utils/aspect-ration";
import { generateMetadataTitle } from "@/shared/utils/metadata";
import { formatPrice } from "@/shared/utils/price";
import { generateWhatsappMessageLink } from "@/shared/utils/whatsapp";
import { ExternalLink, MessageCircle, PenSquareIcon } from "lucide-react";
import Link from "next/link";
import { getCachedArtwork } from "@/shared/lib/cache";
import { TRANSLATE_STATUS_MAP } from "@/features/artworks/utils/status";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const artwork = await getCachedArtwork(slug);

  if (!artwork) {
    return {
      title: generateMetadataTitle("Obra no encontrada"),
      description:
        "La obra que estás buscando no se encuentra en la galería de Chema López Viveros.",
      robots: { index: false, follow: false },
    };
  }

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
  const { session } = await requireAuth();

  const artwork = await getCachedArtwork(slug);

  if (!artwork) return <ArtworkNotFound slug={slug} />;

  const ratio = RATIO_MAP[artwork.aspectRatio];

  const contactMessage = `Hola, estoy interesado en la obra "${artwork.title}" que vi en la galería de Chema López Viveros. ¿Podrías darme más información sobre ella?`;

  return (
    <Container className="space-y-4 py-12">
      <section className="flex flex-col lg:flex-row gap-6 md:gap-8">
        <div>
          {artwork.images.length ? (
            <ImagesCarousel artwork={artwork} />
          ) : (
            <ArtworkImage ratio={ratio} image={artwork.imageUrl} />
          )}
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <Heading className="text-left text-2xl md:text-3xl font-bold tracking-tight">
              {artwork.title}
            </Heading>
            {artwork.description && (
              <p className="mt-3 text-muted-foreground leading-relaxed text-sm md:text-base">
                {artwork.description}
              </p>
            )}
          </div>

          <div className="text-xs text-muted-foreground space-y-1 bg-muted/40 p-3 rounded-md border border-border/50">
            <p>
              <span className="font-medium text-foreground">Dimensiones:</span>{" "}
              {artwork.width} x {artwork.height} cm
            </p>
            <p>
              <span className="font-medium text-foreground">Estado:</span>{" "}
              <Badge
                variant={
                  artwork.status === "exhibition_only" ? "outline" : "default"
                }
              >
                {TRANSLATE_STATUS_MAP[artwork.status]}
              </Badge>
            </p>
          </div>

          <Separator />

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Precio
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                {formatPrice(artwork.price)}
              </p>
              <span className="text-xs font-medium text-muted-foreground">
                MXN
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              className="w-full gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium shadow-sm transition-colors py-6 text-base"
              render={
                <a
                  href={generateWhatsappMessageLink(contactMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              nativeButton={false}
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Comprar vía WhatsApp
            </Button>

            {artwork.fullResolutionImageUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground hover:text-foreground gap-1.5"
                render={
                  <a
                    href={artwork.fullResolutionImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                nativeButton={false}
              >
                <ExternalLink className="size-4" />
                Ver en alta resolución
              </Button>
            )}
            {session && (
              <Button
                render={<Link href={`/dashboard/obras/edit/${artwork.slug}`} />}
                nativeButton={false}
                variant="outline"
              >
                <PenSquareIcon />
                Editar
              </Button>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
}
