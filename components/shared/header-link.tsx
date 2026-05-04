"use client";

import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  intro: boolean;
  className?: string;
}

export const HeaderLink: React.FC<PropsWithChildren<Props>> = ({
  className,
  href,
  intro,
  children,
}) => {
  const isActive = usePathname() === href;

  return (
    <Link
      className={cn(
        className,
        intro
          ? "text-white"
          : isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        "px-3 py-2 rounded-md transition-colors",
      )}
      href={href}
    >
      {children}
    </Link>
  );
};