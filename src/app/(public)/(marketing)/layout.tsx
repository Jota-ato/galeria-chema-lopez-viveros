import { Container } from "@/shared/components/layout/container"
import { ReactNode } from "react"

export default function MarketingLayout({
    children
}: {
    children: ReactNode
}) {
  return (
    <div className="mt-16">
      {children}
    </div>
  )
}