import { Heading } from "@/shared/components/typography/heading";
import { artworksService } from "@/features/artworks/services/artworks-service";
import { ArtworkInfiniteScroll } from "@/features/artworks/components/artworks-infinite-scroll";
import { requireAuth } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function ArtworksPage() {

  const { session } = await requireAuth()
  if (!session) redirect("auth/sign-in")

  const artworks = await artworksService.getLastArtworks(5, 1);

  return (
    <>
      <Heading>Obras más recientes</Heading>
      <ArtworkInfiniteScroll admin={true} initialArtworks={artworks} />
    </>
  );
}
