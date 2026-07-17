import { Route } from "next";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

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
          <li
            key={link.href}
            className="px-4 hover:bg-secondary transition-colors duration-300"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MobileNavigation() {
  return (
    <nav className="md:hidden">
      <DropdownMenu>
        <Button
          render={<DropdownMenuTrigger />}
          variant="ghost"
          className="flex items-center justify-center"
        >
          <div className="size-7 flex justify-center flex-col gap-1">
            <div className="w-full h-px bg-slate-50" />
            <div className="w-full h-px bg-slate-50" />
          </div>
        </Button>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Navegación</DropdownMenuLabel>
            {navigationLinks.map((link) => (
              <DropdownMenuItem
                key={link.href}
                render={<Link href={link.href} />}
                className="px-4 py-2 hover:bg-secondary! hover:text-secondary-foreground! cursor-pointer transition-colors duration-200"
              >
                {link.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
