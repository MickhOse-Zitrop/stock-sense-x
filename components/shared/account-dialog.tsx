"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import { AccountForm } from "@/components/shared/account-form";
import { User } from "@/app/generated/prisma/client";

interface Props {
  user: User;
  className?: string;
}

export const AccountDialog: React.FC<Props> = ({ className, user }) => {
  const router = useRouter();

  return (
    <AlertDialog open onOpenChange={() => router.back()}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Настройки аккаунта</AlertDialogTitle>
          <AlertDialogDescription>
            Перед закрытием сохраните изменения
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AccountForm
          className="no-scrollbar max-h-[50vh] overflow-y-auto"
          user={user}
          dialog
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};