import Link from "next/link";
import { Navigation } from "./navigation";
import { Container } from "../layout/container";

export function Header() {
  return (
    <div className="fixed top-0 w-full bg-transparent py-4">
      <Container className="flex items-center justify-between ">
        <Link href="/">Chema López Viveros</Link>
        <Navigation />
      </Container>
    </div>
  );
}
