import CollectionsTable from "@/features/collections/components/collections-table";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "@/shared/components/ui/search-bar";
import { requireAuth } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { collectionsService } from "@/features/collections/services/collections-service";

const LIMIT = 10;

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number }>;
}) {
  const { session } = await requireAuth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const { page } = await searchParams;

  const { collections, total } = await collectionsService.getAllCollections(
    LIMIT,
    page ?? 1,
  );

  return (
    <>
      <header className="flex gap-6">
        <div className="flex-1">
          <Heading className="text-left">Colecciones</Heading>
          <p className="text-muted-foreground text-sm mt-2">
            Agrupa tus obras en colecciones temáticas para la galería pública.
          </p>
        </div>
        <div>
          <Button
            render={<Link href={"/dashboard/colecciones/create"} />}
            nativeButton={false}
          >
            <Plus className="size-4" />
            Agregar colección
          </Button>
        </div>
      </header>
      <div className="mt-4 flex gap-4 items-center">
        <SearchBar />
        <div>
          <select>
            <option>Todas</option>
            <option>Publicadas</option>
            <option>Borradores</option>
            <option>Archivadas</option>
          </select>
        </div>
      </div>
      <CollectionsTable
        limit={LIMIT}
        page={page ?? 1}
        collections={collections}
        total={total}
      />
    </>
  );
}
