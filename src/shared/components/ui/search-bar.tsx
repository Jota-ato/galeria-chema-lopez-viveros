import { cn } from "@/shared/lib/utils";
import { SearchIcon } from "lucide-react";

export function SearchBar({
    className
}: {
    className?: string;
}) {
  return (
    <div className={cn("bg-popover text-popover-foreground px-2 py-1 flex-1 rounded-md border border-popover-foreground flex items-center gap-2", className)}>
      <SearchIcon className="size-4" />
      <input
        placeholder="Buscar colección..."
        className="flex-1 focus:outline-none"
      />
    </div>
  );
}
