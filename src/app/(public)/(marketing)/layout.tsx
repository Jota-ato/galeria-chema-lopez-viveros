import { ReactNode } from "react"

export default function MarketingLayout({
    children
}: {
    children: ReactNode
}) {
  return (
    <div className="mt-16 py-8 md:py-12">
      {children}
    </div>
  )
}