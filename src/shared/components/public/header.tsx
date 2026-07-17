import Link from "next/link";
import { Navigation } from "./navigation";

export function Header() {
  return (
    <div className="flex items-center justify-between py-4">
      <Link href="/">Chema López Viveros</Link>
      <Navigation />
    </div>
  );
}
