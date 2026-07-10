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
                        href="/"
                    >
                        Sobre mí
                    </Link>
                </li>
                <li className="px-3">
                    <Link
                        href="/"
                    >
                        Proyectos
                    </Link>
                </li>
                <li className="px-3">
                    <Link
                        href="/"
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