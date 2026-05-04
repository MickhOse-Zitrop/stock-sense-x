import { Block, PageHeader, TableAnalysis } from "@/components/shared";
import { Button } from "@/components/ui";
import { Download, Info } from "lucide-react";
import data from "@/data/data.json";
import { cn } from "@/lib/utils";

export default function AnalysisPage() {
  return (
    <>
      <PageHeader
        title="ABC-XYZ Анализ"
        description="Результаты классификации товаров"
      >
        <Button size="lg">
          <Download />
          Экспорт в Excel
        </Button>
      </PageHeader>
      <Block title="Матрица ABC-XYZ">
        <div className="grid grid-cols-3 gap-3">
          {data.dataMatrix.map((item) => (
            <div
              key={item.category}
              className={cn(
                item.color,
                "p-8 flex flex-col gap-2 items-center justify-center rounded-lg border-2",
              )}
            >
              <h5 className="text-xl font-semibold">{item.category}</h5>
              <h4 className="text-3xl font-bold">{item.count}</h4>
              <p className="text-sm text-muted-foreground">
                товаров ({item.percentage})
              </p>
            </div>
          ))}
        </div>
      </Block>
      <Block title="Товары по категориям">
        <TableAnalysis data={data.products} />
      </Block>
      <Block title="Рекомендации по стратегии">
        <div className="flex gap-4 rounded-lg p-4 border hover:border-primary transition-colors">
          <Info className="text-primary" />
          <div>
            <h3 className="text-lg font-medium">
              Категория AX (высокая выручка, низкая вариативность)
            </h3>
            <p className="text-sm text-muted-foreground">
              Постоянный контроль, высокие страховые запасы, приоритет в
              поставках
            </p>
          </div>
        </div>
        <div className="flex gap-4 rounded-lg p-4 border hover:border-primary transition-colors">
          <Info className="text-primary" />
          <div>
            <h3 className="text-lg font-medium">
              Категория AX (высокая выручка, низкая вариативность)
            </h3>
            <p className="text-sm text-muted-foreground">
              Постоянный контроль, высокие страховые запасы, приоритет в
              поставках
            </p>
          </div>
        </div>
        <div className="flex gap-4 rounded-lg p-4 border hover:border-primary transition-colors">
          <Info className="text-primary" />
          <div>
            <h3 className="text-lg font-medium">
              Категория AX (высокая выручка, низкая вариативность)
            </h3>
            <p className="text-sm text-muted-foreground">
              Постоянный контроль, высокие страховые запасы, приоритет в
              поставках
            </p>
          </div>
        </div>
        <div className="flex gap-4 rounded-lg p-4 border hover:border-primary transition-colors">
          <Info className="text-primary" />
          <div>
            <h3 className="text-lg font-medium">
              Категория AX (высокая выручка, низкая вариативность)
            </h3>
            <p className="text-sm text-muted-foreground">
              Постоянный контроль, высокие страховые запасы, приоритет в
              поставках
            </p>
          </div>
        </div>
        <div className="flex gap-4 rounded-lg p-4 border hover:border-primary transition-colors">
          <Info className="text-primary" />
          <div>
            <h3 className="text-lg font-medium">
              Категория AX (высокая выручка, низкая вариативность)
            </h3>
            <p className="text-sm text-muted-foreground">
              Постоянный контроль, высокие страховые запасы, приоритет в
              поставках
            </p>
          </div>
        </div>
      </Block>
    </>
  );
}