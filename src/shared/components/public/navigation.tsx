import Link from "next/link"

export function Navigation() {
    return (
        <>
            <DesktopNavigation />
            <MobileNavigation />
        </>
    )
}

function DesktopNavigation() {
    return (
        <nav className="hidden md:block">
            <ul className="flex justify-between items-center">
                <li className="px-3">
                    <Link
                        href="/"
                    >
                        Inicio
                    </Link>
                </li>
                <li className="px-3">
                    <Link
                        href="/sobre-mi"
                    >
                        Sobre mí
                    </Link>
                </li>
                <li className="px-3">
                    <Link
                        href="/obras"
                    >
                        Obras
                    </Link>
                </li>
                <li className="px-3">
                    <Link
                        href="/contacto"
                    >
                        Contacto
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

function MobileNavigation() {
    return (
        <nav className="md:hidden">

        </nav>
    )
}