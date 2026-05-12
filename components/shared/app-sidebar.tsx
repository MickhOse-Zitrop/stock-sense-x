"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppSidebarHeader } from "@/components/shared/app-sidebar-components/app-sidebar-header";
import { AppSidebarFooter } from "@/components/shared/app-sidebar-components/app-sidebar-footer";
import { linkItems, menuItems } from "@/data/data";
import { User } from "@/app/generated/prisma/client";
import { useProjects } from "@/hooks";
import { Settings2 } from "lucide-react";

interface Props {
  user?: User;
  className?: string;
}

export const AppSidebar: React.FC<Props> = ({ className, user }) => {
  const pathname = usePathname();
  const { lastProject } = useProjects();
  const authorized = !!user;

  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader authorized={authorized} />
      <SidebarContent className={className}>
        <SidebarGroup>
          <SidebarGroupLabel>Инструменты</SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {menuItems.map((item) =>
              item.demo !== authorized ? (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.endsWith(item.link)}
                    variant="menu"
                    tooltip={item.title}
                    asChild
                  >
                    <Link
                      href={`/${authorized ? lastProject?.id : "-1"}/${item.link}`}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : null,
            )}
          </SidebarMenu>
        </SidebarGroup>
        {authorized && (
          <SidebarGroup>
            <SidebarGroupLabel>Настройки</SidebarGroupLabel>
            <SidebarMenu className="gap-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === `/${lastProject?.id}`}
                  variant="menu"
                  tooltip="Настройки проекта"
                  asChild
                >
                  <Link href={`/${lastProject?.id}`}>
                    <Settings2 />
                    <span>Настройки проекта</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Ссылки</SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {linkItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.link}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <AppSidebarFooter user={user} />
    </Sidebar>
  );
};