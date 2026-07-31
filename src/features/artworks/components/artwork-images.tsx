"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Plus } from "lucide-react";

export function ArtworkImages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vista previa</CardTitle>
      </CardHeader>
      <CardContent>
        <article className="flex flex-col gap-4">
          <header>Imagen principal</header>
          <main>
            <div className="w-full min-h-60 md:h-80 border border-dashed flex flex-col  gap-6 items-center justify-center group hover:bg-muted hover:text-primary transition-colors duration-300 cursor-pointer">
              <Plus className="size-8 group-hover:text-primary group-hover:stroke-2 transition-all duration-300" />
              <span className="text-xl group-hover:font-bold transition-all duration-300">
                Agregar imagen
              </span>
            </div>
          </main>
          <footer className="flex gap-4 overflow-auto">
            <div
              aria-label="Agregar imagen extra"
              className="h-24 w-32 border border-dashed flex flex-col gap-2 items-center justify-center group hover:bg-muted hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              <Plus className="size-4 group-hover:size-6 group-hover:text-primary group-hover:stroke-2 transition-all duration-300" />
            </div>
          </footer>
        </article>
      </CardContent>
    </Card>
  );
}
