"use client";

import React, { useRef, useState } from "react";
import { Block, DataOptions, PageHeader } from "@/components/shared";
import {
  Button,
  Input,
  Label,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Upload } from "lucide-react";
import { User } from "@/app/generated/prisma/client";
import { useProjects } from "@/hooks";
import { upload } from "@vercel/blob/client";
import { PutBlobResult } from "@vercel/blob";
import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { uploadData } from "@/app/actions";
import { useRouter } from "next/navigation";

interface Props {
  user?: User;
  className?: string;
}

export const UploadData: React.FC<Props> = ({ className, user }) => {
  const { lastProject: project, projectData, fetchData } = useProjects();
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [blob, setBlob] = React.useState<PutBlobResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const form = useForm();

  if (projectData?.length) {
    console.log(projectData);

    const columns = projectData.length ? Object.keys(projectData[0]) : [];

    return (
      <Block className="max-h-screen" title="Загруженные данные">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectData.map((row, index) => (
              <TableRow className="border-muted" key={index}>
                {columns.map((column) => (
                  <TableCell key={column}>{row[column]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Block>
    );
  }

  const userId = user?.id || -1;
  const projectId = project?.id || -1;

  const handleFile = async () => {
    try {
      setUploading(true);

      if (!fileRef.current?.files?.length) throw new Error("Файл не выбран!");

      const file = fileRef.current.files[0];

      setSelectedFile(file);

      const blobUrl = await upload(
        `user-${userId}/data/${projectId}/${file.name}`,
        file,
        {
          access: "public",
          handleUploadUrl: "/api/upload-data",
          onUploadProgress: (progressEvent) => {
            setProgress(progressEvent.percentage);
          },
        },
      );

      setBlob(blobUrl);
    } catch (error) {
      form.reset();
      console.log(error);
      setSelectedFile(null);
      toast.error((error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async () => {
    try {
      if (blob) {
        const message = await uploadData({
          id: projectId,
          userId: userId,
          url: blob.url,
        });

        toast.success(message);
        router.push(`${projectId}/analysis`);
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <PageHeader
        title="Загрузка данных"
        description="Загрузите файл с данными о продажах для анализа цепочки поставок"
      />
      <FormProvider {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <Block className="gap-8">
            <div className="flex flex-col gap-6">
              <div className="group border-2 border-dashed border-border rounded-lg text-center hover:border-primary transition-colors">
                <Input
                  type="file"
                  ref={fileRef}
                  id="file-upload"
                  className="hidden"
                  disabled={uploading}
                  accept=".csv,.xlsx,.xls"
                  onChange={() => handleFile()}
                />
                <Label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col gap-1 items-center p-8"
                >
                  <Upload
                    size={48}
                    className="text-muted-foreground mb-3 group-hover:text-primary"
                  />
                  <span className="text-lg font-medium text-muted-foreground">
                    {selectedFile ? selectedFile.name : "Выберите файл"}
                  </span>
                  {progress > 0 && progress < 100 ? (
                    <Progress
                      max={100}
                      value={progress}
                      className="w-100 my-2"
                    />
                  ) : null}
                  <span className="text-sm text-muted-foreground">
                    CSV, Excel (XLSX, XLS)
                  </span>
                </Label>
              </div>
              {/*<Button variant="link" size="lg" type="button" disabled={!user}>*/}
              {/*  <Download className="size-5 text-primary" />*/}
              {/*  Скачать шаблон файла*/}
              {/*</Button>*/}
            </div>
            <DataOptions demo={!user} />
            <Button
              size="lg"
              type="submit"
              disabled={
                form.formState.isSubmitting || !fileRef || progress <= 0
              }
              className="py-6"
            >
              Загрузить и проанализировать
            </Button>
          </Block>
        </form>
      </FormProvider>
    </>
  );
};