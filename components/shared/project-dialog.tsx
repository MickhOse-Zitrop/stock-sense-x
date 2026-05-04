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
  Spinner,
} from "@/components/ui";
import { FormProvider, useForm } from "react-hook-form";
import {
  formNewProjectSchema,
  TFormNewProjectValues,
} from "@/components/shared/forms/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/shared/index";
import {
  CreateProjectData,
  EditProjectData,
} from "@/services/dto/projects.dto";
import { useRouter } from "next/navigation";

interface Props {
  callback: (
    data: CreateProjectData | EditProjectData,
    callback: (href: string) => void,
  ) => Promise<void>;
  className?: string;
}

export const ProjectDialog: React.FC<PropsWithChildren<Props>> = ({
  className,
  callback,
  children,
}) => {
  const router = useRouter();
  const form = useForm<TFormNewProjectValues>({
    resolver: zodResolver(formNewProjectSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Новый проект</AlertDialogTitle>
        </AlertDialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit((e) => callback(e, router.push))}>
            <FormInput
              className="mb-4"
              name={"name"}
              id={"name"}
              label="Название проекта"
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
                Создать
              </Button>
            </AlertDialogFooter>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
};