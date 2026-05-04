import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface Props {
  icon?: React.ReactNode;
  title?: string;
  options?: React.ReactNode;
  className?: string;
}

export const Block: React.FC<PropsWithChildren<Props>> = ({
  className,
  icon,
  title,
  options,
  children,
}) => {
  return (
    <div
      className={cn(
        "p-8 w-full flex flex-col gap-4 bg-background rounded-lg shadow-sm",
        className,
      )}
    >
      {(title || icon || options) && (
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            {icon}
            <h3 className="text-xl font-medium">{title}</h3>
          </div>
          {options}
        </div>
      )}
      {children}
    </div>
  );
};