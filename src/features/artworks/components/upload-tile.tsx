"use client";

import { type ChangeEvent, type ReactNode } from "react";
import { Loader2, Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface UploadTileProps {
  /** Must be unique on the page — pairs the hidden <input> with this <label>. */
  id: string;
  multiple?: boolean;
  isUploading: boolean;
  onFilesSelected: (files: File[]) => void;
  label: string;
  variant?: "main" | "compact";
  /** Preview content (e.g. an already-uploaded image). Falls back to the placeholder. */
  children?: ReactNode;
  className?: string;
}

const VARIANT_STYLES = {
  main: "w-full min-h-60 md:h-80 gap-6",
  compact: "h-24 w-32 shrink-0 gap-2",
} as const;

/**
 * Click/tap target that opens the native file picker and shows either a
 * placeholder icon, a loading spinner, or a preview passed in as `children`.
 *
 * Built on a <label>/<input> pair instead of a ref + button.click() hack,
 * so it's keyboard- and screen-reader-accessible for free.
 */
export function UploadTile({
  id,
  multiple = false,
  isUploading,
  onFilesSelected,
  label,
  variant = "main",
  children,
  className,
}: UploadTileProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) onFilesSelected(files);
    e.target.value = "";
  }

  return (
    <label
      htmlFor={id}
      className={cn(
        "group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed transition-colors duration-300 hover:bg-muted hover:text-primary",
        VARIANT_STYLES[variant],
        className
      )}
    >
      <input
        id={id}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={handleChange}
      />
      {children ??
        (isUploading ? (
          <Loader2
            className={cn("animate-spin", variant === "main" ? "size-8" : "size-4")}
          />
        ) : (
          <>
            <Plus
              className={cn(
                "transition-all duration-300 group-hover:text-primary group-hover:stroke-2",
                variant === "main" ? "size-8" : "size-4 group-hover:size-6"
              )}
            />
            {variant === "main" && (
              <span className="text-xl transition-all duration-300 group-hover:font-bold">
                {label}
              </span>
            )}
          </>
        ))}
    </label>
  );
}