"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { useDeleteCollectionStore } from "../stores/delete-collection-store";
import { Trash2 } from "lucide-react";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils"; // ajusta el import si tu helper está en otro lado

export function DeleteDialog() {
  const { open, setOpen, collection, setCollection } =
    useDeleteCollectionStore();

  if (!collection) return null;

  return (
    <AlertDialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        setCollection(null);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Eliminar la colección{" "}
            <span className="text-primary">{collection.name}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col gap-2 rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Eliminar:</strong> borra la
            colección, las obras se conservan sin asignar.
          </p>
          <p>
            <strong className="text-foreground">Eliminar con obras:</strong>{" "}
            borra la colección y todas las obras que contiene.
          </p>
        </div>

        <div className="flex gap-2 flex-col md:flex-row md:justify-end">
          <AlertDialogCancel variant="outline" className="md:order-1">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction variant={"secondary"} className={"md:order-2"}>
            <Trash2 className="size-4" />
            Eliminar
          </AlertDialogAction>
          <AlertDialogAction variant={"destructive"} className={"md:order-3"}>
            <Trash2 className="size-4" />
            Eliminar con obras
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
