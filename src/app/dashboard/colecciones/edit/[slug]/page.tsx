import { artworksService } from "@/features/artworks/services/artworks-service";
import { CreateCollection } from "@/features/collections/components/create-collection";
import { collectionsService } from "@/features/collections/services/collections-service";
import { requireAuth } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function EditCollection({
  params
}: {
  params: Promise<{ slug: string }>
}) {

  const { session } = await requireAuth();
  if (!session) redirect("/auth/sign-in");
  const { slug } = await params;
  const collection = await collectionsService.getCollectionBySlug(slug, true)
  if (!collection) return <></>
  const initialArtworks = await artworksService.getLastArtworks(5, 1);

  return (
    <>
      <CreateCollection collection={collection} initialArtworks={initialArtworks} />
    </>
  )
}