import { AnalyticsResult } from "@/lib/analytics";

export type KPIResult = {
  cards: {
    currentStock: {
      value: number;
      diff: string;
    };
    turnover: {
      value: number;
      label: string;
    };
    serviceLevel: {
      value: number;
      diff: string;
    };
    coverageDays: {
      value: number;
      label: string;
    };
  };

  salesChart: {
    date: string;
    sales: number;
  }[];

  topProducts: {
    name: string;
    revenue: number;
  }[];

  alerts: {
    product: string;
    message: string;
    level: "critical" | "warning";
  }[];

  optimizations: {
    title: string;
    description: string;
  }[];
};

export function buildKPI(analytics: AnalyticsResult): KPIResult {
  const items = analytics.items;
  const daily = analytics.dailySeries;

  const currentStock = items.reduce((s, i) => s + i.qty, 0);

  const totalDailyRevenue = daily.reduce((s, d) => s + d.revenue, 0);

  const avgDailyDemand =
    daily.length > 0 ? totalDailyRevenue / daily.length : 0;

  const normStock = avgDailyDemand * 30;

  const stockDiff =
    normStock === 0 ? 0 : ((currentStock - normStock) / normStock) * 100;

  const totalRevenue = items.reduce((s, i) => s + i.revenue, 0);

  const turnover = currentStock === 0 ? 0 : totalRevenue / currentStock;

  const stableItems = items.filter((i) => i.xyz === "X").length;

  const serviceLevel =
    items.length > 0 ? (stableItems / items.length) * 100 : 0;

  const targetServiceLevel = 95;

  const serviceDiff = serviceLevel - targetServiceLevel;

  const coverageDays = avgDailyDemand === 0 ? 0 : currentStock / avgDailyDemand;

  const salesChart = daily.map((d) => ({
    date: d.date.slice(5),
    sales: Number(d.revenue.toFixed(0)),
  }));

  const topProducts = [...items]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map((i) => ({
      name: i.name,
      revenue: Number(i.revenue.toFixed(0)),
    }));

  const alerts: KPIResult["alerts"] = [];

  for (const item of items) {
    if (item.qty <= 5) {
      alerts.push({
        product: item.name,
        message: "Критически низкий запас",
        level: "critical",
      });
    } else if (item.qty <= 10) {
      alerts.push({
        product: item.name,
        message: "Запас ниже точки заказа",
        level: "warning",
      });
    }
  }

  const overstock = items.filter((i) => i.group === "CZ" || i.group === "BZ");

  const unstable = items.filter((i) => i.xyz === "Z");

  const lowStock = items.filter((i) => i.qty < 10);

  const optimizations: KPIResult["optimizations"] = [];

  if (overstock.length > 0) {
    const savings = overstock.reduce((s, i) => s + i.revenue, 0);

    optimizations.push({
      title: "Снизить запасы",
      description: `${overstock.length} товаров с избыточным запасом. Потенциальная экономия: ₽${Math.round(
        savings,
      ).toLocaleString()}`,
    });
  }

  if (lowStock.length > 0) {
    optimizations.push({
      title: "Увеличить заказы",
      description: `${lowStock.length} товаров требуют пополнения`,
    });
  }

  if (unstable.length > 0) {
    optimizations.push({
      title: "Пересмотреть политику",
      description: `${unstable.length} товаров с нестабильным спросом`,
    });
  }

  return {
    cards: {
      currentStock: {
        value: Math.round(currentStock),
        diff: `${stockDiff >= 0 ? "+" : ""}${stockDiff.toFixed(1)}%`,
      },

      turnover: {
        value: Number(turnover.toFixed(1)),
        label: "раз в год",
      },

      serviceLevel: {
        value: Number(serviceLevel.toFixed(1)),
        diff: `${serviceDiff >= 0 ? "+" : ""}${serviceDiff.toFixed(1)}% от цели`,
      },

      coverageDays: {
        value: Number(coverageDays.toFixed(0)),
        label: "дней запаса",
      },
    },

    salesChart,
    topProducts,
    alerts,
    optimizations,
  };
}