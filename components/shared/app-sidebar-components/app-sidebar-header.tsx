import React from "react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import { CornerUpLeft, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { ProjectDropdown } from "@/components/shared/app-sidebar-components/project-dropdown";

interface Props {
  authorized: boolean;
  className?: string;
}

export const AppSidebarHeader: React.FC<Props> = ({
  className,
  authorized,
}) => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          {authorized ? (
            <ProjectDropdown />
          ) : (
            <SidebarMenuButton size="lg" asChild>
              <Link href={"/"}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-destructive text-sidebar-primary-foreground">
                  <TriangleAlert className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="truncate font-medium">Демо-версия</span>
                  <span className="truncate text-xs text-muted-foreground">
                    На главную
                  </span>
                </div>
                <CornerUpLeft className="ml-auto" />
              </Link>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};