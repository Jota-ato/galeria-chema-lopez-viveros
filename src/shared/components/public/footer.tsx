import Link from "next/link";
import { Container } from "../layout/container";
import { Heading } from "../typography/heading";
import { navigationLinks } from "./navigation";

export function Footer() {
  return (
    <footer className="bg-secondary p-12">
      <Container className="flex flex-col md:flex-row gap-8 justify-between">
        <div className="flex flex-col">
          <Heading level={2}>Galería Chema López Viveros</Heading>
          Fragmentos de realidad transformados en eternidad.
          <nav className="mt-4 flex gap-4">
            {navigationLinks.map(link => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col md:justify-end md:items-end md:text-right text-xs">
          <p>
            &copy; 2026 Galería Chema López Viveros. Todos los derechos
            reservados.
          </p>
          <a className="text-sm" href="https://julio-zavala.me" rel="noopener noreferrer" target="_blank">
            Página desarrollada por
            <span className="font-bold text-primary">Julio Zavala</span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
