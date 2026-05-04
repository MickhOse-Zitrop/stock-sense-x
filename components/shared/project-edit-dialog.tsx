"use client";

import React, { PropsWithChildren } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Spinner
} from "@/components/ui";
import { FormProvider, useForm } from "react-hook-form";
import { formEditProjectSchema, TFormEditProjectValues } from "@/components/shared/forms/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/shared/index";
import { EditProjectData } from "@/services/dto/projects.dto";
import { Project } from "@/app/generated/prisma/client";

interface Props {
  field: "name" | "description";
  project: Project;
  callback: (data: EditProjectData) => Promise<void>;
  className?: string;
}

export const ProjectEditDialog: React.FC<PropsWithChildren<Props>> = ({
  className,
  field,
  callback,
  project,
  children,
}) => {
  const form = useForm<TFormEditProjectValues>({
    resolver: zodResolver(formEditProjectSchema),
    defaultValues: {
      name: project.name || "",
      description: project.description || "",
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Изменение {field === "name" ? "названия" : "описания"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(callback)}>
            <FormInput
              className="mb-4 max-h-[50vh] no-scrollbar"
              name={field === "name" ? "name" : "description"}
              id={field === "name" ? "name" : "description"}
              label={field === "name" ? "Название проекта" : "Описание проекта"}
              textarea={field === "description"}
            />
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={form.formState.isSubmitting}
                  type="reset"
                >
                  Отменить
                </Button>
              </AlertDialogCancel>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Spinner />}
                Сохранить
              </Button>
            </AlertDialogFooter>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
};