import { Container } from "@/shared/components/layout/container"
import { Header } from "@/shared/components/public/header"
import { ReactNode } from "react"

export default function PublicLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <div>
            <Container>
                <Header />
                {children}
            </Container>
        </div>
    )
}