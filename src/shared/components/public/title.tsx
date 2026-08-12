import { cn } from "@/shared/lib/utils";
import { ReactNode } from "react";

export function Title({
  children,
  textAbove,
  textBelow,
  className,
}: {
  children: ReactNode;
  textAbove?: string;
  textBelow?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {textAbove && (
        <span className="text-sm tracking-[0.2em] uppercase text-stone-500">
          {textAbove}
        </span>
      )}
      {children}
      {textBelow && (
        <p className="text-stone-600 leading-relaxed max-w-md mt-2">
          {textBelow}
        </p>
      )}
    </div>
  );
}
