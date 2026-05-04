"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenuButton,
  Skeleton,
  Spinner,
  useSidebar,
} from "@/components/ui";
import {
  ArrowRight,
  ChevronsUpDown,
  GalleryVerticalEnd,
  Plus,
} from "lucide-react";
import { useProjects } from "@/hooks";
import { ProjectDialog } from "../project-dialog";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
}

export const ProjectDropdown: React.FC<Props> = ({ className }) => {
  const { projects, lastProject, createProject, loading } = useProjects();
  const { isMobile } = useSidebar();

  return loading ? (
    <SidebarMenuButton size="lg">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Spinner className="size-4" />
      </div>
      <Skeleton className="ml-1 w-full h-full bg-secondary" />
      <ChevronsUpDown className="ml-auto" />
    </SidebarMenuButton>
  ) : lastProject ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span className="truncate font-medium">{lastProject.name}</span>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="start"
        side={isMobile ? "bottom" : "right"}
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Проекты
          </DropdownMenuLabel>
          {projects.map((project) => (
            <DropdownMenuItem
              className={cn(
                "gap-2 p-2",
                project.id === lastProject.id &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              )}
              // disabled={project.id === lastProject.id}
              key={project.id}
              asChild
            >
              <Link href={`/${project.id}`}>
                <div
                  className={cn(
                    "flex size-6 items-center justify-center rounded-md border",
                    project.id === lastProject.id && "border-0",
                  )}
                >
                  <GalleryVerticalEnd className="size-3.5 shrink-0" />
                </div>
                {project.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ProjectDialog callback={createProject}>
            <DropdownMenuItem
              className="gap-2 p-2"
              onSelect={(e) => e.preventDefault()}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Добавить проект
              </div>
            </DropdownMenuItem>
          </ProjectDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <ProjectDialog callback={createProject}>
      <SidebarMenuButton size="lg">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Plus className="size-4" />
        </div>
        <span className="truncate font-medium">Новый проект</span>
        <ArrowRight className="ml-auto" />
      </SidebarMenuButton>
    </ProjectDialog>
  );
};