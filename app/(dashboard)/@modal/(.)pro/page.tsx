"use client";

import { ProForm } from "@/components/shared";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import React from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function ProModalPage() {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Аккаунт Pro</DialogTitle>
        </DialogHeader>
        <ProForm className="no-scrollbar max-h-[50vh] overflow-y-auto" />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Отменить</Button>
          </DialogClose>
          <Button type="submit" disabled>
            <Sparkles />
            Подключить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}