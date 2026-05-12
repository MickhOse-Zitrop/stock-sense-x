"use client";

import { Block, PageHeader } from "@/components/shared";
import { Settings, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";
import { useProjects } from "@/hooks";
import { runAnalytics } from "@/lib/analytics";
import { runForecast } from "@/lib/forecast";

export default function ForecastPage() {
  const [days, setDays] = useState<number[]>([7]);
  const { projectData, loading } = useProjects();

  const result = runAnalytics(projectData ?? []);
  const series = result.dailySeries.map((d) => d.revenue);
  const forecast = runForecast(series, "linear");

  const actualData = result.dailySeries.map((item) => ({
    date: item.date,
    actual: item.revenue,
    forecast: null,
  }));

  console.log(projectData);

  const lastDate = new Date(
    result.dailySeries[result.dailySeries.length - 1].date,
  );

  const forecastData = forecast.prediction.map((value, i) => {
    const d = new Date(lastDate);

    d.setDate(d.getDate() + i + 1);

    return {
      date: d.toISOString().split("T")[0],
      actual: null,
      forecast: value,
    };
  });

  const chartData = [...actualData, ...forecastData];

  console.log(forecast);

  return !loading ? (
    <>
      <PageHeader
        title="Прогнозирование"
        description="ML-прогноз спроса на основе исторических данных"
      />
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
          <div className="text-sm text-blue-700 mb-1">MAPE</div>
          <div className="text-3xl font-bold text-blue-900 mb-1">
            {forecast.metrics.mape}%
          </div>
          <div className="text-xs text-blue-600">
            Средняя абсолютная процентная ошибка
          </div>
        </div>
        <div className="bg-linear-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
          <div className="text-sm text-green-700 mb-1">MAE</div>
          <div className="text-3xl font-bold text-green-900 mb-1">
            {forecast.metrics.mae}
          </div>
          <div className="text-xs text-green-600">
            Средняя абсолютная ошибка
          </div>
        </div>
        <div className="bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
          <div className="text-sm text-purple-700 mb-1">R²</div>
          <div className="text-3xl font-bold text-purple-900 mb-1">
            {forecast.metrics.r2}
          </div>
          <div className="text-xs text-purple-600">
            Коэффициент детерминации
          </div>
        </div>
      </div>
      <Block
        title="График прогноза"
        icon={<TrendingUp className="text-primary" />}
        options={
          <div className="flex gap-2 items-center text-sm">
            <Settings size={16} />
            Модель: Авто
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
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
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Факт"
              dot={{ fill: "#3b82f6", r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#10b981"
              strokeWidth={3}
              strokeDasharray="5 5"
              name="Прогноз"
              dot={{ fill: "#10b981", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Block>
      {/*<Block title="Настройки прогноза">*/}
      {/*  <div className="grid grid-cols-2 gap-10">*/}
      {/*    <Field className="">*/}
      {/*      <FieldLabel>Горизонт прогноза: {days} дней</FieldLabel>*/}
      {/*      <Slider*/}
      {/*        value={days}*/}
      {/*        onValueChange={setDays}*/}
      {/*        step={1}*/}
      {/*        min={7}*/}
      {/*        max={30}*/}
      {/*        className="my-3"*/}
      {/*      />*/}
      {/*      <FieldDescription className="flex items-center justify-between">*/}
      {/*        <span>7 дней</span>*/}
      {/*        <span>14 дней</span>*/}
      {/*        <span>30 дней</span>*/}
      {/*      </FieldDescription>*/}
      {/*    </Field>*/}
      {/*    <Field>*/}
      {/*      <FieldLabel>Модель прогнозирования</FieldLabel>*/}
      {/*      <Select defaultValue={"auto"}>*/}
      {/*        <SelectTrigger>*/}
      {/*          <SelectValue />*/}
      {/*        </SelectTrigger>*/}
      {/*        <SelectContent>*/}
      {/*          <SelectItem value={"auto"}>Автоматический выбор</SelectItem>*/}
      {/*          <SelectItem value={"prophet"}>Prophet</SelectItem>*/}
      {/*          <SelectItem value={"xgboost"}>XGBoost</SelectItem>*/}
      {/*          <SelectItem value={"arima"}>ARIMA</SelectItem>*/}
      {/*        </SelectContent>*/}
      {/*      </Select>*/}
      {/*    </Field>*/}
      {/*  </div>*/}
      {/*  <div className="bg-primary/10 border border-primary/50 rounded-lg p-4">*/}
      {/*    <h3 className="font-medium text-primary mb-2">*/}
      {/*      Рекомендации по прогнозу*/}
      {/*    </h3>*/}
      {/*    <ul className="space-y-1 text-sm text-primary">*/}
      {/*      <li>• Ожидается рост спроса на 12% в следующие 7 дней</li>*/}
      {/*      <li>• Рекомендуется увеличить страховой запас на 15%</li>*/}
      {/*      <li>• Обратите внимание на пиковую нагрузку 14.03</li>*/}
      {/*    </ul>*/}
      {/*  </div>*/}
      {/*</Block>*/}
    </>
  ) : (
    <Block title="Загрузка данных..."></Block>
  );
}