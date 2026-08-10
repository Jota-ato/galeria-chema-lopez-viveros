"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Collection } from "@/features/collections/types/collections.types"; // Ajusta el path a tus tipos
import { Button } from "@/shared/components/ui/button"; // Asumiendo que tienes un componente Button

interface SelectSelectedCollectionsProps {
  collections: Collection[];
  // En el futuro puedes recibir las colecciones ya seleccionadas desde la BD
  // initialSelected?: Collection[];
}

export function SelectSelectedCollections({
  collections,
}: SelectSelectedCollectionsProps) {
  // Estado para las colecciones publicadas que aún no son destacadas
  const [available, setAvailable] = useState<Collection[]>(collections);

  // Estado para las colecciones que el usuario ha seleccionado y ordenado
  const [selected, setSelected] = useState<Collection[]>([]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Si se suelta fuera de un área válida
    if (!destination) return;

    // Si se suelta en la misma posición de la misma lista
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Reordenamiento dentro de la misma lista
    if (source.droppableId === destination.droppableId) {
      const items =
        source.droppableId === "available"
          ? Array.from(available)
          : Array.from(selected);

      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      if (source.droppableId === "available") {
        setAvailable(items);
      } else {
        setSelected(items);
      }
      return;
    }

    // Movimiento entre listas diferentes
    const sourceList =
      source.droppableId === "available"
        ? Array.from(available)
        : Array.from(selected);
    const destList =
      destination.droppableId === "available"
        ? Array.from(available)
        : Array.from(selected);

    const [movedItem] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, movedItem);

    if (source.droppableId === "available") {
      setAvailable(sourceList);
      setSelected(destList);
    } else {
      setSelected(sourceList);
      setAvailable(destList);
    }
  };

  const handleSave = () => {
    // Aquí es donde llamarás a tu Server Action con el array "selected"
    // que ya tiene el orden correcto en base a su índice.
    console.log("Colecciones destacadas a guardar:", selected);
  };

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna de Disponibles */}
          <div className="flex flex-col border rounded-md bg-muted/50 p-4">
            <h3 className="font-semibold mb-4">Disponibles</h3>
            <Droppable droppableId="available">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 space-y-2 min-h-50"
                >
                  {available.map((collection, index) => (
                    <Draggable
                      key={collection.id}
                      draggableId={collection.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 bg-background rounded-md border border-border shadow-sm cursor-grab ${
                            snapshot.isDragging ? "ring-2 ring-primary" : ""
                          }`}
                        >
                          {collection.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Columna de Destacadas (Seleccionadas) */}
          <div className="flex flex-col border rounded-md bg-muted/50 p-4">
            <h3 className="font-semibold mb-4">
              Colecciones Destacadas (Ordenadas)
            </h3>
            <Droppable droppableId="selected">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 space-y-2 min-h-50"
                >
                  {selected.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Arrastra colecciones aquí
                    </p>
                  )}
                  {selected.map((collection, index) => (
                    <Draggable
                      key={collection.id}
                      draggableId={collection.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 bg-background rounded-md border border-border shadow-sm flex items-center justify-between cursor-grab ${
                            snapshot.isDragging ? "ring-2 ring-primary" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">⋮⋮</span>
                            {collection.name}
                          </div>
                          <span className="text-xs bg-secondary px-2 py-1 rounded text-secondary-foreground">
                            Pos: {index + 1}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} disabled={selected.length === 0}>
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
