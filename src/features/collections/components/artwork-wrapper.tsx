"use client";

import { cn } from "@/shared/lib/utils";
import { CSSProperties, ReactNode } from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";

/**
 * Contrato que debe cumplir cualquier componente pasado como `artworkWrapper`
 * a ArtworkBentoAlbum / ArtworkInfiniteScroll.
 *
 * - `style` es OBLIGATORIO de reenviar: react-photo-album lo usa para
 *   posicionar y dimensionar cada card dentro del layout tipo masonry.
 * - `selected` / `onToggle` son opcionales: solo los usan wrappers que
 *   implementan selección (como este). Un wrapper "tonto" puede ignorarlos.
 */
export interface ArtworkWrapperProps {
  children: ReactNode;
  style?: CSSProperties;
  selected?: boolean;
  onToggle?: () => void;
}

export function ArtworkWrapper({
  children,
  style,
  selected = false,
  onToggle,
}: ArtworkWrapperProps) {
  return (
    <div
      style={style}
      onClick={onToggle}
      className={cn(
        "relative rounded-xl overflow-hidden",
        selected
          ? "ring-2 ring-primary rounded-xl cursor-pointer"
          : "cursor-pointer",
      )}
    >
      {children}
      <div className="absolute bottom-2 right-2 p-2">
        <Checkbox checked={selected} onCheckedChange={onToggle} />
      </div>
    </div>
  );
}
