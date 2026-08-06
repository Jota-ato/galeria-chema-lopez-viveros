import { artworksService } from "@/features/artworks/services/artworks-service";
import { CreateCollection } from "@/features/collections/components/create-collection";
import { requireAuth } from "@/lib/auth-server";

import { redirect } from "next/navigation";

export default async function CreateColection() {
  const { session } = await requireAuth();
  if (!session) redirect("/auth/sign-in");
  const initialArtworks = await artworksService.getLastArtworks(5, 1);

  return (
    <>
      <CreateCollection initialArtworks={initialArtworks} />
    </>
  );
}
