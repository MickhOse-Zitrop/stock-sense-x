import React, { PropsWithChildren } from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  className?: string;
}

export const LearnDialog: React.FC<PropsWithChildren<Props>> = ({
  className,
  description,
  children,
  title,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">Подробнее</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div
          className={cn(className, "no-scrollbar max-h-[50vh] overflow-y-auto")}
        >
          <p className="mb-4 leading-normal">{children}</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Закрыть</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};