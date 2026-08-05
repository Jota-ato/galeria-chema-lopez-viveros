import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/components/ui/table";
import { Collection } from "../types/collections.types";
import { formatDate } from "@/shared/utils/date";
import { Button } from "@/shared/components/ui/button";
import { PenSquareIcon, Trash2Icon } from "lucide-react";

export default function CollectionsTable({
  collections,
}: {
  collections: Collection[];
}) {
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
            <TableCell>10</TableCell>
            <TableCell>{collection.status}</TableCell>
            <TableCell>{formatDate(collection.updatedAt)}</TableCell>
            <TableCell className="flex gap-2">
              <Button variant="outline" size="icon">
                <PenSquareIcon />
              </Button>
              <Button variant="destructive" size="icon">
                <Trash2Icon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
