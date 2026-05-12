"use client";

import { Block, PageHeader, TableAnalysis } from "@/components/shared";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjects } from "@/hooks";
import { AnalyticsResult, runAnalytics } from "@/lib/analytics";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui";

export default function AnalysisPage() {
  const { projectData, loading } = useProjects();
  const [demo, setDemo] = useState(false);
  const [result, setResult] = useState<AnalyticsResult | null>(null);

  console.log(projectData);

  useEffect(() => {
    if (!projectData?.length && !loading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDemo(true);
      setResult(
        runAnalytics([
          {
            date: "2026-01-01",
            product: "1234",
            qty: "10",
            price: "100",
          },
          {
            date: "2026-01-01",
            product: "4321",
            qty: "5",
            price: "200",
          },
          {
            date: "2026-01-02",
            product: "1234",
            qty: "12",
            price: "100",
          },
          {
            date: "2026-01-02",
            product: "4321",
            qty: "4",
            price: "200",
          },
          {
            date: "2026-01-03",
            product: "1234",
            qty: "15",
            price: "100",
          },
          {
            date: "2026-01-03",
            product: "4321",
            qty: "6",
            price: "200",
          },
          {
            date: "2026-01-04",
            product: "1234",
            qty: "18",
            price: "100",
          },
          {
            date: "2026-01-04",
            product: "4321",
            qty: "7",
            price: "200",
          },
          {
            date: "2026-01-05",
            product: "1234",
            qty: "17",
            price: "100",
          },
          {
            date: "2026-01-05",
            product: "4321",
            qty: "8",
            price: "200",
          },
          {
            date: "2026-01-06",
            product: "1234",
            qty: "20",
            price: "100",
          },
          {
            date: "2026-01-06",
            product: "4321",
            qty: "9",
            price: "200",
          },
          {
            date: "2026-01-07",
            product: "1234",
            qty: "22",
            price: "100",
          },
          {
            date: "2026-01-07",
            product: "4321",
            qty: "10",
            price: "200",
          },
          {
            date: "2026-01-08",
            product: "1234",
            qty: "21",
            price: "100",
          },
          {
            date: "2026-01-08",
            product: "4321",
            qty: "11",
            price: "200",
          },
          {
            date: "2026-01-09",
            product: "1234",
            qty: "24",
            price: "100",
          },
          {
            date: "2026-01-09",
            product: "4321",
            qty: "12",
            price: "200",
          },
          {
            date: "2026-01-10",
            product: "1234",
            qty: "25",
            price: "100",
          },
          {
            date: "2026-01-10",
            product: "4321",
            qty: "13",
            price: "200",
          },
        ]),
      );
    } else {
      setResult(runAnalytics(projectData ?? []));
    }
  }, [projectData, loading]);

  return result === null ? (
    <>
      <Skeleton />
    </>
  ) : (
    <>
      <PageHeader
        title={demo ? "ABC-XYZ Анализ демо-данных" : "ABC-XYZ Анализ"}
        description="Результаты классификации товаров"
      >
        {/*<Button size="lg">*/}
        {/*  <Download />*/}
        {/*  Экспорт в Excel*/}
        {/*</Button>*/}
      </PageHeader>
      <Block title="Матрица ABC-XYZ">
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(result.matrix).map(([key, cell]) => (
            <div
              key={key}
              className={cn(
                cell.color,
                "p-8 flex flex-col gap-2 items-center justify-center rounded-lg border-2",
              )}
            >
              <h5 className="text-xl font-semibold">{key}</h5>
              <h4 className="text-3xl font-bold">{cell.count}</h4>
              <p className="text-sm text-muted-foreground">
                товаров ({cell.percent})
              </p>
            </div>
          ))}
        </div>
      </Block>
      <Block title="Товары по категориям">
        <TableAnalysis data={result.items} />
      </Block>
      <Block title="Рекомендации по стратегии">
        {result.recommendations.map((recommendation, key) => (
          <div
            className="flex gap-4 rounded-lg p-4 border hover:border-primary transition-colors"
            key={key}
          >
            <Info className="text-primary" />
            <div>
              <h3 className="text-lg font-medium">{recommendation.title}</h3>
              <p className="text-sm text-muted-foreground">
                {recommendation.description}
              </p>
            </div>
          </div>
        ))}
      </Block>
    </>
  );
}