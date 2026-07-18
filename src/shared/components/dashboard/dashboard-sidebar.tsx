"use client";
import Link from "next/link";
import { Heading } from "../typography/heading";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Home, LogOut, Sidebar as SidebarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { LogOutButton } from "../ui/log-out-button";

export function DashboardSidebar() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Heading level={2} className="text-lg!">
          {open ? "Galería Chema" : "GC"}
        </Heading>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={toggleSidebar}>
                <SidebarIcon /> Cerrar menú
              </SidebarMenuButton>
              <SidebarMenuButton render={<Link href="/dashboard" />}>
                <Home /> Inicio
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogOutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
