"use client";

import { useState } from "react";
import { Block, PageHeader } from "@/components/shared";
import { Calculator, TrendingUp } from "lucide-react";
import { Button, Field, FieldGroup, FieldLabel, Input, Slider } from "@/components/ui";

type Result = {
  safetyStock: number;
  reorderPoint: number;
  zScore: number;
};

function getZ(serviceLevel: number): number {
  const table: Record<number, number> = {
    80: 0.84,
    85: 1.04,
    90: 1.28,
    95: 1.65,
    97.5: 1.96,
    99: 2.33,
  };

  const keys = Object.keys(table).map(Number);

  const closest = keys.reduce((prev, curr) =>
    Math.abs(curr - serviceLevel) < Math.abs(prev - serviceLevel) ? curr : prev,
  );

  return table[closest] ?? 1.65;
}

function calculateInventory(
  demand: number,
  leadTime: number,
  serviceLevel: number,
): Result {
  const z = getZ(serviceLevel);
  const sigma = demand * 0.3; // приближение
  const sqrtLT = Math.sqrt(leadTime);

  const safetyStock = z * sigma * sqrtLT;
  const reorderPoint = demand * leadTime + safetyStock;

  return {
    safetyStock: Math.round(safetyStock),
    reorderPoint: Math.round(reorderPoint),
    zScore: z,
  };
}

export default function InventoryPage() {
  const [demand, setDemand] = useState<number>(0);
  const [leadTime, setLeadTime] = useState<number>(0);
  const [serviceLevel, setServiceLevel] = useState<number>(95);

  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = () => {
    if (!demand || !leadTime) return;

    const res = calculateInventory(demand, leadTime, serviceLevel);
    setResult(res);
  };

  return (
    <>
      <PageHeader
        title={"Расчет запасов"}
        description={"Калькулятор страхового запаса и точки заказа"}
      />

      <div className="w-full grid grid-cols-2 gap-5">
        <Block
          title="Параметры расчета"
          icon={<Calculator className="text-primary" />}
        >
          <FieldGroup>
            <Field>
              <FieldLabel>Средний спрос (ед/день)</FieldLabel>
              <Input
                type="number"
                value={demand}
                onChange={(e) => setDemand(Number(e.target.value))}
              />
            </Field>

            <Field>
              <FieldLabel>Лид-тайм (дней)</FieldLabel>
              <Input
                type="number"
                value={leadTime}
                onChange={(e) => setLeadTime(Number(e.target.value))}
              />
            </Field>

            <Field>
              <FieldLabel>Уровень сервиса (%)</FieldLabel>
              <Input
                type="number"
                value={serviceLevel}
                onChange={(e) => setServiceLevel(Number(e.target.value))}
              />

              <Slider
                value={[serviceLevel]}
                min={80}
                max={99}
                step={0.5}
                onValueChange={(val) => setServiceLevel(val[0])}
              />
            </Field>

            <Button size="lg" onClick={handleCalculate}>
              Рассчитать
            </Button>
          </FieldGroup>
        </Block>

        <Block
          title="Результаты"
          icon={<TrendingUp className="text-green-500" />}
        >
          {!result ? (
            <div className="h-full flex flex-col gap-3 items-center justify-center">
              <Calculator size={64} className="text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                Введите параметры и нажмите &quot;Рассчитать&quot;
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Страховой запас</p>
                <p className="text-2xl font-bold">{result.safetyStock}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Точка заказа</p>
                <p className="text-2xl font-bold">{result.reorderPoint}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Z-score</p>
                <p className="text-lg">{result.zScore}</p>
              </div>
            </div>
          )}
        </Block>
      </div>
    </>
  );
}