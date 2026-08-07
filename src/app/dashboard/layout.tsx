import { requireAuth } from "@/lib/auth-server";
import { DashboardSidebar } from "@/shared/components/dashboard/dashboard-sidebar";
import { Container } from "@/shared/components/layout/container";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { session } = await requireAuth();
  if (!session) redirect("/auth/sign-in");

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex-1 py-8 md:py-12 max-w-full overflow-auto">
        <Container className="space-y-4">{children}</Container>
      </main>
    </SidebarProvider>
  );
}
