import { SelectSelectedCollections } from "@/features/collections/components/select-selected-collections";
import { collectionsService } from "@/features/collections/services/collections-service";
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

  // Fetch de servidor
  const collections =
    await collectionsService.getCollectionsByStatus("published");

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

          <SelectSelectedCollections collections={collections} />
        </CardContent>
      </Card>
    </>
  );
}
