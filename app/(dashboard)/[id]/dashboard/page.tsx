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
import data from "@/data/data.json";

export default function DashboardPage() {
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
          <h1 className="text-xl font-bold">8,456</h1>
          <p className="text-xs text-green-500">+5% от нормы</p>
        </div>
        <div className="flex flex-col shadow-sm p-6 border-l-4 border-green-500 rounded-lg">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Оборачиваемость</p>
            <TrendingUp className="text-green-500" />
          </div>
          <h1 className="text-xl font-bold">12.5</h1>
          <p className="text-xs text-green-500">раз в год</p>
        </div>
        <div className="flex flex-col shadow-sm p-6 border-l-4 border-purple-500 rounded-lg">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Уровень сервиса</p>
            <CircleAlert className="text-purple-500" />
          </div>
          <h1 className="text-xl font-bold">97.2%</h1>
          <p className="text-xs text-green-500">+2.1% от цели</p>
        </div>
        <div className="flex flex-col shadow-sm p-6 border-l-4 border-orange-500 rounded-lg">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Дни покрытия</p>
            <Calendar className="text-orange-500" />
          </div>
          <h1 className="text-xl font-bold">28</h1>
          <p className="text-xs text-muted-foreground">дней запаса</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        <Block title="Продажи по дням">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.salesData}>
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
            <BarChart data={data.topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis
                dataKey="name"
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
              <Bar dataKey="sales" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Block>
      </div>
      <Block
        title="Тревоги и предупреждения"
        icon={<AlertCircle className="text-destructive" />}
      >
        <WarningItem
          alert={true}
          id={1234}
          description={"Критически низкий запас"}
        />
        <WarningItem id={4321} description={"Запас ниже точки заказа"} />
      </Block>
      <Block title="Рекомендации по оптимизации">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="font-medium text-green-900 mb-2">
              Снизить запасы
            </div>
            <div className="text-sm text-green-700">
              5 товаров имеют переизбыток запаса. Потенциальная экономия:
              ₽450,000
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="font-medium text-blue-900 mb-2">
              Увеличить заказы
            </div>
            <div className="text-sm text-blue-700">
              8 товаров требуют пополнения для поддержания уровня сервиса
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="font-medium text-purple-900 mb-2">
              Пересмотреть политику
            </div>
            <div className="text-sm text-purple-700">
              3 товара показывают нестабильный спрос. Рекомендуется
              корректировка стратегии
            </div>
          </div>
        </div>
      </Block>
    </>
  );
}