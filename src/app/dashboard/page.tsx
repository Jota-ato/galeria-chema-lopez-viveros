import { SelectSelectedArtworks } from "@/features/artworks/components/select-selected-artworks";
import { artworksService } from "@/features/artworks/services/artworks-service";
import { selectedArtworksService } from "@/features/artworks/services/selected-artworks-service";
import { SelectSelectedCollections } from "@/features/collections/components/select-selected-collections";
import { collectionsService } from "@/features/collections/services/collections-service";
import { selectedCollectionsService } from "@/features/collections/services/selected-collections-service";
import { requireAuth } from "@/lib/auth-server";
import { Heading } from "@/shared/components/typography/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { redirect } from "next/navigation";

export default async function DashboardHomePage() {
  const { session } = await requireAuth();

  if (!session) redirect("auth/sign-in");

  const collections =
    await collectionsService.getCollectionsByStatus("published");
  const featuredCollections = await selectedCollectionsService.getFeaturedCollections();
  const artworks = await artworksService.getLastArtworks(100, 1);
  const featuredArtworks = await selectedArtworksService.getFeaturedArtworks();


  return (
    <>
      <Heading>Inicio</Heading>
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Colecciones destacadas</CardTitle>
          <CardDescription>
            Estas son las colecciones que se muestran en la página de inicio.
            Puedes agregar cuantas colecciones quieras. Para cambiar el orden
            arrastra y suelta las colecciones en la lista de colecciones
            destacadas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Solo puedes destacar colecciones publicadas.
          </p>

          <SelectSelectedCollections  collections={collections} featuredCollections={featuredCollections} />
        </CardContent>
      </Card>
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Obras destacadas</CardTitle>
          <CardDescription>
            Estas son las obras que se muestran en la página de inicio. Puedes agregar cuantas obras quieras. Para cambiar el orden arrastra y suelta las obras en la lista de obras destacadas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SelectSelectedArtworks artworks={artworks} featuredArtworks={featuredArtworks} />
        </CardContent>
      </Card>
    </>
  );
}
