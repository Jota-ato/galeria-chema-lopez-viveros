import { cn } from "@/shared/lib/utils"
import { ReactNode } from "react"

export function Container({
    children,
    className
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div className={cn(
            "w-9/10 mx-auto",
            className
        )}>
            {children}
        </div>
    )
}