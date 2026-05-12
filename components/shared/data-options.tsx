"use client";

import React from "react";
import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  demo: boolean;
  className?: string;
}

type AnalysisType = "quick" | "full";

export const DataOptions: React.FC<Props> = ({ className, demo }) => {
  const [analysisType, setAnalysisType] = React.useState<AnalysisType>("quick");
  const [hasColumns, setHasColumns] = React.useState(true);

  return (
    <div className={cn(className, "flex flex-col gap-8")}>
      <FieldGroup className="bg-accent rounded-lg p-6">
        <FieldSet>
          <FieldLegend className="mb-4">Тип анализа</FieldLegend>
          <FieldGroup>
            <RadioGroup
              defaultValue={analysisType}
              onValueChange={(value: AnalysisType) => setAnalysisType(value)}
              className="gap-3"
            >
              <Field orientation="horizontal">
                <RadioGroupItem value="quick" id="quick-analysis" />
                <FieldContent>
                  <FieldLabel
                    htmlFor="quick-analysis"
                    className="text-base/4 cursor-pointer"
                  >
                    Быстрый анализ
                  </FieldLabel>
                  <FieldDescription>
                    Базовый ABC-XYZ анализ с основными рекомендациями
                  </FieldDescription>
                </FieldContent>
              </Field>
              {!demo ? (
                <Field orientation="horizontal">
                  <RadioGroupItem value="full" id="full-analysis" />
                  <FieldContent>
                    <FieldLabel
                      htmlFor="full-analysis"
                      className="text-base/4 cursor-pointer"
                    >
                      Полный анализ
                    </FieldLabel>
                    <FieldDescription>
                      Расширенная аналитика с прогнозированием и оптимизацией
                    </FieldDescription>
                  </FieldContent>
                </Field>
              ) : null}
            </RadioGroup>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
      <FieldGroup className="bg-accent rounded-lg p-6">
        <Field orientation="horizontal">
          <Checkbox
            id="check-data"
            checked={hasColumns}
            required
            onCheckedChange={() => setHasColumns(!hasColumns)}
          />
          <FieldContent>
            <FieldLabel
              htmlFor="check-data"
              className="text-base/4 cursor-pointer mb-1"
            >
              Мои данные содержат следующие колонки:
            </FieldLabel>
            <FieldDescription className="flex flex-col gap-0.5">
              <span className="flex gap-1.5 items-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Продажи (объем продукта)</span>
              </span>
              <span className="flex gap-1.5 items-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Товар (название или артикул)</span>
              </span>
              <span className="flex gap-1.5 items-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Дата (дата продажи)</span>
              </span>
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  );
};