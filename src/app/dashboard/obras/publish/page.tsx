
import { ArtworkPanel } from "@/features/artworks/components/artwork-panel";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";

import { redirect } from "next/navigation";

export default async function PublishPage() {
  const { session } = await requireAuth();
  if (!session) redirect("/auth/sign-in");

  return (
    <>
      <Heading>Publicar obra</Heading>

      <ArtworkPanel />
    </>
  );
}
