"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  Database,
  GalleryVerticalEnd,
  History,
  Infinity,
  PaintbrushVertical,
  Sparkles,
} from "lucide-react";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui";

interface Props {
  className?: string;
}

export const ProForm: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center p-2", className)}>
      <div className="mb-4 flex flex-col items-center gap-4">
        <Sparkles className="text-primary" size={128} />
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl font-bold">Аккаунт Pro</h1>
          <p className="text-sm">
            <span className="font-medium">490</span> руб/мес.
          </p>
        </div>
      </div>
      <Collapsible className="w-full rounded-md data-[state=open]:bg-muted">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="lg" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <GalleryVerticalEnd className="text-primary" />
              Проекты
            </span>
            <Infinity />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p className="font-medium">Без Pro</p>
            <p className="font-bold">5</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="w-full rounded-md data-[state=open]:bg-muted">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="lg" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <History className="text-primary" />
              Хранение данных
            </span>
            <Infinity />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p className="font-medium">Без Pro</p>
            <p className="font-bold">30 дней</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="w-full rounded-md data-[state=open]:bg-muted">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="lg" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <Database className="text-primary" />
              Размер данных
            </span>
            <Infinity />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p className="font-medium">Без Pro</p>
            <p className="font-bold">4 GB</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="w-full rounded-md data-[state=open]:bg-muted">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="lg" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <BrainCircuit className="text-primary" />
              Агенты
            </span>
            <p className="font-bold">4</p>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p className="font-medium">Без Pro</p>
            <p className="font-bold">1</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="w-full rounded-md data-[state=open]:bg-muted">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="lg" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <PaintbrushVertical className="text-primary" />
              Выбор цвета
            </span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p className="font-medium">Без Pro</p>
            <p className="font-bold">Синий</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible className="w-full rounded-md data-[state=open]:bg-muted">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="lg" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="text-primary" />
              Уникальная иконка
            </span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p className="font-medium">Без Pro</p>
            <p className="font-bold">Нет</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};