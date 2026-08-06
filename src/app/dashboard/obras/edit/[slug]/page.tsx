import { requireAuth } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { getCachedArtwork } from "@/shared/lib/cache";
import { ArtworkNotFound } from "@/features/artworks/components/artwork-not-found";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Save } from "lucide-react";
import { ArtworkPanel } from "@/features/artworks/components/artwork-panel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = await getCachedArtwork(slug);
  if (!artwork) {
    return {
      title: "Obra no encontrada",
    };
  }
  return {
    title: `Editar obra: ${artwork.title}`,
  };
}

export default async function EditArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = await getCachedArtwork(slug);
  const { session } = await requireAuth();
  if (!session) redirect("auth/sign-in");
  if (!artwork) return <ArtworkNotFound slug={slug} />;

  return (
    <>
      <header className="p-4 rounded-md bg-card flex gap-4 flex-col md:flex-row md:items-center md:justify-between">
        <Heading className="text-left text-xl! font-medium">
          Editar obra: {artwork.title}
        </Heading>
      </header>
      <ArtworkPanel key={artwork.id} artwork={artwork} />
    </>
  );
}
