"use client";

import React from "react";
import { Block, Page, PageHeader, ProjectEditDialog } from "@/components/shared";
import { useProjects } from "@/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Separator,
  Skeleton
} from "@/components/ui";
import { ArrowDownToLine, Edit2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export const Project: React.FC<Props> = ({ className }) => {
  const {
    lastProject: project,
    loading,
    editProject,
    deleteProject,
  } = useProjects();
  const router = useRouter();

  if (loading) {
    return (
      <Block className="size-full">
        <Skeleton className="size-full" />
      </Block>
    );
  }

  if (!project) {
    return <Page.EmptyProject />;
  }

  return (
    <>
      <PageHeader title={`Настройки ${project.name}`} />
      <Block>
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <p className="font-medium">Название:</p>
            <p className="italic">{project.name}</p>
          </div>
          <div className="flex gap-2 items-center">
            <ProjectEditDialog
              callback={editProject}
              field={"name"}
              project={project}
            >
              <Button>
                <Edit2 />
                Изменить
              </Button>
            </ProjectEditDialog>
          </div>
        </div>
        <Separator />
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-start">
            <p className="font-medium">Описание:</p>
            <p className="italic">{project.description}</p>
          </div>
          <div className="flex gap-2 items-center">
            <ProjectEditDialog
              callback={editProject}
              field={"description"}
              project={project}
            >
              <Button>
                <Edit2 />
                Изменить
              </Button>
            </ProjectEditDialog>
          </div>
        </div>
        <Separator />
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <p className="font-medium">Данные:</p>
            <p className="italic">
              {project.dataUrl ? project.dataUrl : "Отсутствуют"}
            </p>
          </div>
          {project.dataUrl ? (
            <div className="flex gap-2 items-center">
              <a href={project.dataUrl} download>
                <Button>
                  <ArrowDownToLine />
                  Скачать
                </Button>
              </a>
              <Button variant="destructive">
                <Trash />
                Удалить
              </Button>
            </div>
          ) : null}
        </div>
        <Separator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-fit">
              <Trash />
              Удалить проект
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <Trash />
              </AlertDialogMedia>
              <AlertDialogTitle>Удалить проект?</AlertDialogTitle>
              <AlertDialogDescription>
                Это действие навсегда удалит проект {project.name}. Вы уверены,
                что хотите удалить его?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">Отмена</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => deleteProject(project.id, router.push)}
              >
                Удалить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Block>
    </>
  );
};