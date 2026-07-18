import { requireAuth } from "@/lib/auth-server";
import { DashboardSidebar } from "@/shared/components/dashboard/dashboard-sidebar";
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
      <main>{children}</main>
    </SidebarProvider>
  );
}
