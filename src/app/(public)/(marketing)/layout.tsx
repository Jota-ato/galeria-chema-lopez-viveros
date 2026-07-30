import { Container } from "@/shared/components/layout/container"
import { ReactNode } from "react"

export default function MarketingLayout({
    children
}: {
    children: ReactNode
}) {
  return (
    <Container className="mt-16 py-8 md:py-12">
      {children}
    </Container>
  )
}