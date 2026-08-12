import { Footer } from "@/shared/components/public/footer";
import { Header } from "@/shared/components/public/header";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
