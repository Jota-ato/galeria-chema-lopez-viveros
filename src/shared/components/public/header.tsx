import Link from "next/link";
import { Navigation } from "./navigation";
import { Container } from "../layout/container";

export function Header() {
  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-black/20 backdrop-blur-xs h-16 flex items-center">
      <Container className="flex items-center justify-between text-slate-50">
        <Link href="/">Chema López Viveros</Link>
        <Navigation />
      </Container>
    </div>
  );
}
