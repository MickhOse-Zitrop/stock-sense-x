"use client";

import { Block, PageHeader, WarningItem } from "@/components/shared";
import {
  AlertCircle,
  Calendar,
  CircleAlert,
  Package,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useProjects } from "@/hooks";
import { runAnalytics } from "@/lib/analytics";
import { buildKPI } from "@/lib/kpi";

export default function DashboardPage() {
  const { projectData, loading } = useProjects();

  if (!projectData?.length) {
    return (
      <>
        <PageHeader
          title="Нет загруженных данных"
          description={`Загрузите данные в разделе "Загрузка данных"`}
        />
      </>
    );
  }

  const analytics = runAnalytics(projectData ?? []);
  const kpi = buildKPI(analytics);

  console.log(kpi.topProducts);

  return (
    <>
      <PageHeader
        title={"Дашборд KPI"}
        description={"Сводная аналитика цепочки поставок"}
      />
      <div className="w-full grid grid-cols-4 gap-4">
        <div className="flex flex-col shadow-sm p-6 border-l-4 border-primary rounded-lg">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Текущий запас</p>
            <Package className="text-primary" />
          </div>
          <h1 className="text-xl font-bold">
            {kpi.cards.currentStock.value.toLocaleString()}
          </h1>
          <p className="text-xs text-green-500">
            {kpi.cards.currentStock.diff}
          </p>
        </div>
        <div className="flex flex-col shadow-sm p-6 border-l-4 border-green-500 rounded-lg">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Оборачиваемость</p>
            <TrendingUp className="text-green-500" />
          </div>
          <h1 className="text-xl font-bold">{kpi.cards.turnover.value}</h1>
          <p className="text-xs text-green-500">{kpi.cards.turnover.label}</p>
        </div>
        <div className="flex flex-col shadow-sm p-6 border-l-4 border-purple-500 rounded-lg">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Уровень сервиса</p>
            <CircleAlert className="text-purple-500" />
          </div>
          <h1 className="text-xl font-bold">{kpi.cards.serviceLevel.value}%</h1>
          <p className="text-xs text-green-500">
            {kpi.cards.serviceLevel.diff}
          </p>
        </div>
        <div className="flex flex-col shadow-sm p-6 border-l-4 border-orange-500 rounded-lg">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Дни покрытия</p>
            <Calendar className="text-orange-500" />
          </div>
          <h1 className="text-xl font-bold">{kpi.cards.coverageDays.value}</h1>
          <p className="text-xs text-muted-foreground">
            {kpi.cards.coverageDays.label}
          </p>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        <Block title="Продажи по дням">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={kpi.salesChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Block>
        <Block title="Топ товаров">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={kpi.topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis
                dataKey="revenue"
                type="category"
                stroke="#6b7280"
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="revenue" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Block>
      </div>
      <Block
        title="Тревоги и предупреждения"
        icon={<AlertCircle className="text-destructive" />}
      >
        {kpi.alerts.map((a) => (
          <WarningItem
            key={a.product}
            alert={a.level === "critical"}
            id={Number(a.product)}
            description={a.message}
          />
        ))}
      </Block>
      <Block title="Рекомендации по оптимизации">
        <div className="grid grid-cols-3 gap-4">
          {kpi.optimizations.map((r) => (
            <div key={r.title} className="border rounded-lg p-4">
              <div className="font-medium mb-2">{r.title}</div>
              <div className="text-sm text-muted-foreground">
                {r.description}
              </div>
            </div>
          ))}
        </div>
      </Block>
    </>
  );
}