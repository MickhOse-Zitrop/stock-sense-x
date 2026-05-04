"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { User } from "@/app/generated/prisma/client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  Label,
  Progress,
} from "@/components/ui";
import { type PutBlobResult } from "@vercel/blob";
import { Camera, X } from "lucide-react";
import { toast } from "sonner";
import { upload } from "@vercel/blob/client";
import { updateAvatar } from "@/app/actions";

interface Props {
  user: User;
  className?: string;
}

export const AvatarEdit: React.FC<Props> = ({ className, user }) => {
  const imageRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [blob, setBlob] = React.useState<PutBlobResult | null>(null);

  const handleFormSubmit = async (remove?: boolean) => {
    setUploading(true);

    if (remove) {
      try {
        const message = await updateAvatar({ imageUrl: "" });

        toast.success(message);
      } catch (error) {
        const e = error as Error;

        console.log(error);
        toast.error(e.message);
      } finally {
        setUploading(false);
      }
    } else {
      if (!imageRef.current?.files?.length) {
        throw new Error("Вы должны выбрать изображение");
      }

      const file = imageRef.current.files[0];

      try {
        const blobUrl = await upload(
          `user-${user.id}/images/${file.name}`,
          file,
          {
            access: "public",
            handleUploadUrl: "/api/upload-image",
            onUploadProgress: (progressEvent) => {
              setProgress(progressEvent.percentage);
            },
          },
        );
        setBlob(blobUrl);

        const message = await updateAvatar({ imageUrl: blobUrl.url });

        toast.success(message);
      } catch (error) {
        const e = error as Error;

        console.log(error);
        toast.error(e.message);
      } finally {
        setProgress(0);
        setUploading(false);
      }
    }
  };

  return (
    <div
      className={cn(
        "relative self-center flex flex-col items-center justify-between group",
        className,
      )}
    >
      <Label
        htmlFor="profile-file-input"
        className="opacity-0 group-hover:opacity-100 absolute size-full flex justify-center z-10 bg-background/40 duration-200 cursor-pointer rounded-full"
      >
        <Camera size={48} />
      </Label>
      <Button
        className="opacity-0 group-hover:opacity-100 absolute z-10 -right-4"
        size="icon"
        variant="ghost"
        type="button"
        onClick={() => handleFormSubmit(true)}
      >
        <X />
      </Button>
      <Input
        type="file"
        className="hidden"
        id="profile-file-input"
        accept="image/png, image/jpeg"
        ref={imageRef}
        disabled={uploading}
        onChange={() => handleFormSubmit()}
      />
      <Avatar
        className={cn("size-50 aspect-square", {
          "animate-pulse": uploading,
        })}
      >
        <AvatarImage
          className="object-cover"
          src={blob?.url || user.imageUrl || ""}
          alt="Avatar"
        />
        <AvatarFallback className="text-9xl">{user.name?.[0]}</AvatarFallback>
      </Avatar>
      {progress > 0 && <Progress value={progress} max={100} />}
    </div>
  );
};