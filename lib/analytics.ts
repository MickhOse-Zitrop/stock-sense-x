export type RawItem = Record<string, any>;

export type NormalizedItem = {
  name: string;
  price: number;
  qty: number;
  history?: number[];
};

type Recommendation = {
  category: string;
  title: string;
  description: string;
};

const matrixColors: Record<string, string> = {
  AX: "bg-green-100 border-green-300",
  AY: "bg-green-50 border-green-200",
  AZ: "bg-yellow-50 border-yellow-200",

  BX: "bg-blue-100 border-blue-300",
  BY: "bg-blue-50 border-blue-200",
  BZ: "bg-orange-50 border-orange-200",

  CX: "bg-gray-100 border-gray-300",
  CY: "bg-gray-50 border-gray-200",
  CZ: "bg-red-50 border-red-200",
};

export type AnalyzedItem = NormalizedItem & {
  revenue: number;
  abc: "A" | "B" | "C";
  xyz: "X" | "Y" | "Z";
  group: string;
  variation: number;
  strategy: string;
};

export type MatrixCell = {
  count: number;
  percent: number;
  color: string;
};

export type AnalyticsResult = {
  items: AnalyzedItem[];
  matrix: Record<string, MatrixCell>;
  kpi: {
    totalRevenue: number;
    totalQty: number;
    totalItems: number;
  };
  recommendations: Recommendation[];
  dailySeries: {
    date: string;
    revenue: number;
  }[];
};

export function normalizeData(data: RawItem[]): NormalizedItem[] {
  return data.map((item) => ({
    name: item.name ?? item.product ?? "Unknown",
    price: Number(item.price ?? item.revenue ?? 0),
    qty: Number(item.qty ?? item.quantity ?? 0),
    history: item.history
      ? String(item.history)
          .split(";")
          .map((v) => Number(v))
          .filter((v) => !isNaN(v))
      : undefined,
  }));
}

function applyABC(data: NormalizedItem[]) {
  const withRevenue = data.map((item) => ({
    ...item,
    revenue: Number((item.price * item.qty).toFixed(2)),
  }));

  const totalRevenue = withRevenue.reduce((s, i) => s + i.revenue, 0);

  const sorted = [...withRevenue].sort((a, b) => b.revenue - a.revenue);

  let cumulative = 0;

  return sorted.map((item) => {
    cumulative += item.revenue;
    const share = cumulative / totalRevenue;

    let abc: "A" | "B" | "C" = "C";
    if (share <= 0.8) abc = "A";
    else if (share <= 0.95) abc = "B";

    return { ...item, abc };
  });
}

function getCV(values: number[]) {
  if (!values.length) return 0;

  const mean = values.reduce((a, b) => a + b, 0) / values.length;

  if (!mean) return 0;

  const variance =
    values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;

  const std = Math.sqrt(variance);

  return std / mean;
}

function applyXYZ(data: ReturnType<typeof applyABC>) {
  return data.map((item) => {
    const history = item.history ?? [item.qty];

    const cv = getCV(history);

    let xyz: "X" | "Y" | "Z" = "Z";
    if (cv < 0.1) xyz = "X";
    else if (cv < 0.25) xyz = "Y";

    return {
      ...item,
      xyz,
      variation: Number(cv.toFixed(3)),
    };
  });
}

const strategies: Record<string, string> = {
  AX: "Ключевые товары. Жёсткий контроль, точный прогноз",
  AY: "Важные, но нестабильные. Улучшить прогнозирование",
  AZ: "Высокий риск. Пересмотреть стратегию",

  BX: "Стабильные, средний приоритет",
  BY: "Контроль и оптимизация",
  BZ: "Снизить запасы",

  CX: "Автоматизировать",
  CY: "Сокращать ассортимент",
  CZ: "Кандидаты на удаление",
};

export function runAnalytics(raw: RawItem[]): AnalyticsResult {
  const normalized = normalizeData(raw);
  const abc = applyABC(normalized);
  const xyz = applyXYZ(abc);

  const items: AnalyzedItem[] = xyz.map((item) => {
    const group = `${item.abc}${item.xyz}`;

    return {
      ...item,
      group,
      strategy: strategies[group],
    };
  });

  const matrix: Record<string, MatrixCell> = {};
  const total = items.length;

  for (const item of items) {
    if (!matrix[item.group]) {
      matrix[item.group] = {
        count: 0,
        percent: 0,
        color: matrixColors[item.group],
      };
    }
    matrix[item.group].count++;
  }

  for (const key in matrix) {
    matrix[key].percent = (matrix[key].count / total) * 100;
  }

  const totalRevenue = items.reduce((s, i) => s + i.revenue, 0);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  const recommendations: Recommendation[] = [];

  if (matrix["CZ"]?.count > 0) {
    recommendations.push({
      category: "CZ",
      title: "Категория CZ",
      description: "Рекомендуется вывести из ассортимента",
    });
  }

  const dailyMap = new Map<string, number>();

  for (const item of raw) {
    const date = item.date;
    const revenue = Number(item.price ?? 0) * Number(item.qty ?? 0);

    dailyMap.set(date, (dailyMap.get(date) || 0) + revenue);
  }

  const unsortedSeries = Array.from(dailyMap.entries()).map(
    ([date, revenue]) => ({
      date,
      revenue,
    }),
  );

  // ✅ сортировка дат
  const sorted = unsortedSeries.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // ✅ заполнение пропусков дней
  const filled: typeof sorted = [];

  if (sorted.length > 0) {
    const start = new Date(sorted[0].date);
    const end = new Date(sorted[sorted.length - 1].date);

    const map = new Map(sorted.map((d) => [d.date, d.revenue]));

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split("T")[0];

      filled.push({
        date: key,
        revenue: map.get(key) ?? 0,
      });
    }
  }

  return {
    items,
    matrix,
    dailySeries: filled,
    kpi: {
      totalRevenue,
      totalQty,
      totalItems: items.length,
    },
    recommendations,
  };
}