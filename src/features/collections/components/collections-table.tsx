"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/shared/components/ui/table";
import { CollectionWithArtworksCount } from "../types/collections.types";
import { formatDate } from "@/shared/utils/date";
import { Button } from "@/shared/components/ui/button";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { CustomPagination } from "@/shared/components/dashboard/custom-pagination";
import Link from "next/link";
import { useDeleteCollectionStore } from "../stores/delete-collection-store";

export default function CollectionsTable({
  collections,
  limit,
  page,
  total,
}: {
  collections: CollectionWithArtworksCount[];
  limit: number;
  page: number;
  total: number;
}) {
  const { setOpen, setCollection } = useDeleteCollectionStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Obras</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Actualizada</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {collections.map((collection) => (
          <TableRow key={collection.id}>
            <TableCell>{collection.name}</TableCell>
            <TableCell>{collection.artworksCount}</TableCell>
            <TableCell>{collection.status}</TableCell>
            <TableCell>{formatDate(collection.updatedAt)}</TableCell>
            <TableCell className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Editar"
                nativeButton={false}
                render={
                  <Link
                    href={`/dashboard/colecciones/edit/${collection.slug}`}
                  />
                }
              >
                <PenSquareIcon />
              </Button>
              <Button
                onClick={() => {
                  setOpen(true);
                  setCollection(collection);
                }}
                variant="destructive"
                size="icon"
              >
                <Trash2Icon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            <CustomPagination total={total} limit={limit} page={page} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
