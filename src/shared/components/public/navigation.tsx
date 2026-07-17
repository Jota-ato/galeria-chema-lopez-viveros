import { Route } from "next";
import Link from "next/link";

const navigationLinks: {
  href: Route;
  label: string;
}[] = [
  {
    href: "/",
    label: "Inicio",
  },
  {
    href: "/sobre-mi",
    label: "Sobre mí",
  },
  {
    href: "/obras",
    label: "Obras",
  },
  {
    href: "/contacto",
    label: "Contacto",
  },
];

export function Navigation() {
  return (
    <>
      <DesktopNavigation />
      <MobileNavigation />
    </>
  );
}

function DesktopNavigation() {
  return (
    <nav className="hidden md:block">
      <ul className="flex justify-between items-center">
        {navigationLinks.map((link) => (
          <li key={link.href} className="px-3">
            <Link href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MobileNavigation() {
  return <nav className="md:hidden"></nav>;
}
