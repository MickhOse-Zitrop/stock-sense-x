import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer
      className={cn(
        "w-full flex flex-col gap-1 items-center text-center justify-center text-sm text-muted-foreground py-8",
        className,
      )}
    >
      <p></p>
      <p>
        Copyright © {new Date().getFullYear()} All rights reserved. Made with ♡
        by MickhOse Zitrop
      </p>
    </footer>
  );
};