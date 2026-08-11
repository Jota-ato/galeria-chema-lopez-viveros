"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";
import { Artwork } from "../types/artworks.types";
import { TRANSLATE_STATUS_MAP } from "../utils/status";

export interface SelectedArtworkEntry {
  position: number;
  artwork: Artwork;
}

export interface SelectSelectedArtworksProps {
  artworks: Artwork[];
  selectedArtworks: SelectedArtworkEntry[];
}

export function SelectSelectedArtworks({
  artworks,
  selectedArtworks,
}: SelectSelectedArtworksProps) {
  const [selected, setSelected] = useState<Artwork[]>(
    selectedArtworks
      .sort((a, b) => a.position - b.position)
      .map((entry) => ({ ...entry.artwork })),
  );
  const [available, setAvailable] = useState<Artwork[]>(
    artworks.filter((artwork) =>
      selected.every((selectedArtwork) => selectedArtwork.id !== artwork.id),
    ),
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

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

  const handleSave = async () => {
    
  };

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col border rounded-md bg-muted/50 p-4">
            <h3 className="font-semibold mb-4">Disponibles</h3>
            <Droppable droppableId="available">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 space-y-2 min-h-50"
                >
                  {available.map((artwork, index) => (
                    <Draggable
                      key={artwork.id}
                      draggableId={artwork.id}
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
                          <div className="flex items-center gap-3">
                            {artwork.imageUrl && (
                              <img
                                src={artwork.imageUrl}
                                alt={artwork.title}
                                className="w-10 h-10 object-cover rounded"
                              />
                            )}
                            <div className="min-w-0">
                              <p className="font-medium truncate">
                                {artwork.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {TRANSLATE_STATUS_MAP[artwork.status]}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className="flex flex-col border rounded-md bg-muted/50 p-4">
            <h3 className="font-semibold mb-4">Obras Destacadas (Ordenadas)</h3>
            <Droppable droppableId="selected">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 space-y-2 min-h-50"
                >
                  {selected.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Arrastra obras aquí
                    </p>
                  )}
                  {selected.map((artwork, index) => (
                    <Draggable
                      key={artwork.id}
                      draggableId={artwork.id}
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
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-muted-foreground shrink-0">
                              ⋮⋮
                            </span>
                            {artwork.imageUrl && (
                              <img
                                src={artwork.imageUrl}
                                alt={artwork.title}
                                className="w-10 h-10 object-cover rounded shrink-0"
                              />
                            )}
                            <p className="font-medium truncate">
                              {artwork.title}
                            </p>
                          </div>
                          <span className="text-xs bg-secondary px-2 py-1 rounded text-secondary-foreground shrink-0 ml-2">
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
        <Button
          onClick={handleSave}
          disabled={selected.length === 0 || isSaving}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <Spinner />
              Guardando...
            </span>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </div>
    </div>
  );
}
