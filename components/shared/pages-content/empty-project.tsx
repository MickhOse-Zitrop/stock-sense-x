"use client";

import React from "react";
import { Block } from "@/components/shared";
import { Button, Separator } from "@/components/ui";
import { ProjectDialog } from "../project-dialog";
import { useProjects } from "@/hooks";
import { Plus } from "lucide-react";

interface Props {
  className?: string;
}

export const EmptyProject: React.FC<Props> = () => {
  const { createProject } = useProjects();

  return (
    <>
      <Block title="Проект не найден">
        Вы ещё не создали проект или у вас нет доступа к нему. <br /> Создайте
        новый проект, чтобы начать анализ поставок и прогнозирование спроса.
        <Separator />
        <p className="text-sm">
          Сейчас у вас нет активного проекта, поэтому раздел с настройками
          недоступен.
          <br />
          Проект — это основа всей работы системы: он объединяет данные о
          поставках, продажах и остатках, на основе которых строится аналитика и
          прогнозирование.
        </p>
        <p className="text-sm">После создания проекта вы сможете:</p>
        <ul className="text-sm">
          <li>— загружать данные о продажах и закупках</li>
          <li>— выполнять ABC-XYZ анализ ассортимента</li>
          <li>— получать прогноз спроса с помощью ML-модели</li>
          <li>— рассчитывать страховой запас</li>
          <li>— отслеживать KPI в интерактивном дашборде</li>
        </ul>
        <p className="text-sm">
          Создайте проект, чтобы начать работу и получить первые аналитические
          результаты.
        </p>
        <ProjectDialog callback={createProject}>
          <Button className="w-fit">
            <Plus />
            Новый проект
          </Button>
        </ProjectDialog>
      </Block>
    </>
  );
};