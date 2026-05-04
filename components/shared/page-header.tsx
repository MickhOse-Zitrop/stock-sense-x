import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description?: string;
  className?: string;
}

export const PageHeader: React.FC<PropsWithChildren<Props>> = ({
  className,
  title,
  description,
  children,
}) => {
  return (
    <div className={cn(className, "w-full flex items-center justify-between")}>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
};