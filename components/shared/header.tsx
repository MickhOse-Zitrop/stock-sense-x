"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Container, HeaderLink, LoginDialog } from "@/components/shared";
import { Package2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

interface Props {
  intro?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ className, intro = false }) => {
  return (
    <header
      className={cn(
        className,
        "w-full flex flex-col items-center select-none",
        !intro ? "bg-background border-b" : "bg-primary",
      )}
    >
      <Container className="py-3">
        <div className="w-full flex items-center justify-between">
          <Link className="flex gap-2 items-center" href={"/"}>
            <Package2
              size={36}
              className={intro ? "text-white" : "text-primary"}
            />
            <h1
              className={`text-xl font-semibold select-text ${intro && "text-white"}`}
            >
              StockSenseX
            </h1>
          </Link>
          <div className="flex gap-6 items-center">
            <HeaderLink href={"/upload-data"} intro={intro}>
              Демо-версия
            </HeaderLink>
            <HeaderLink href={"/cases"} intro={intro}>
              Кейсы
            </HeaderLink>
            <HeaderLink href={"/contacts"} intro={intro}>
              Контакты
            </HeaderLink>

            <LoginDialog>
              <Button size="lg" variant={intro ? "secondary" : "default"}>
                Вход
              </Button>
            </LoginDialog>
          </div>
        </div>
      </Container>
    </header>
  );
};