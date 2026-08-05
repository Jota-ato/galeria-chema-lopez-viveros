import CollectionsTable from "@/features/collections/components/collections-table";
import { Heading } from "@/shared/components/typography/heading";
import { Button } from "@/shared/components/ui/button";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { collections } from "@/features/collections/constants/draft-collections";

export default async function CollectionsPage() {
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
        <div className="bg-popover text-popover-foreground px-2 py-1 flex-1 rounded-md border border-popover-foreground flex items-center gap-2">
          <Search className="size-4" />
          <input
            placeholder="Buscar colección..."
            className="flex-1 focus:outline-none"
          />
        </div>
        <div>
          <select>
            <option>Todas</option>
            <option>Publicadas</option>
            <option>Borradores</option>
            <option>Archivadas</option>
          </select>
        </div>
      </div>
      <CollectionsTable collections={collections} />
    </>
  );
}
