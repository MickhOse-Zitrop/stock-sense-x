import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Container: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "max-w-7xl w-full flex-1 flex flex-col gap-8 items-center px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
};