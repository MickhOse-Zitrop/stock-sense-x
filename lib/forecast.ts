export type ModelType = "naive" | "moving_average" | "linear";

export function naive(series: number[], steps = 4) {
  const last = series[series.length - 1] ?? 0;
  return Array(steps).fill(last);
}

export function movingAvg(series: number[], steps = 4) {
  const avg = series.reduce((a, b) => a + b, 0) / (series.length || 1);

  return Array(steps).fill(avg);
}

export function linear(series: number[], steps = 4) {
  const n = series.length;
  if (n < 2) return naive(series, steps);

  const x = series.map((_, i) => i);
  const y = series;

  const xMean = x.reduce((a, b) => a + b, 0) / n;
  const yMean = y.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let den = 0;

  for (let i = 0; i < n; i++) {
    num += (x[i] - xMean) * (y[i] - yMean);
    den += (x[i] - xMean) ** 2;
  }

  const slope = den === 0 ? 0 : num / den;
  const intercept = yMean - slope * xMean;

  return Array.from({ length: steps }, (_, i) => slope * (n + i) + intercept);
}

export function mae(a: number[], p: number[]) {
  const n = Math.min(a.length, p.length);
  return a.slice(0, n).reduce((s, v, i) => s + Math.abs(v - p[i]), 0) / n;
}

export function mape(a: number[], p: number[]) {
  const n = Math.min(a.length, p.length);
  return (
    (a.slice(0, n).reduce((s, v, i) => {
      if (v === 0) return s;
      return s + Math.abs((v - p[i]) / v);
    }, 0) /
      n) *
    100
  );
}

export function r2(a: number[], p: number[]) {
  const n = Math.min(a.length, p.length);

  const mean = a.slice(0, n).reduce((s, v) => s + v, 0) / n;

  let ssTot = 0;
  let ssRes = 0;

  for (let i = 0; i < n; i++) {
    ssTot += (a[i] - mean) ** 2;
    ssRes += (a[i] - p[i]) ** 2;
  }

  return ssTot === 0 ? 0 : 1 - ssRes / ssTot;
}

export function runForecast(
  series: number[],
  model: ModelType = "linear",
  steps = 4,
) {
  if (series.length <= steps + 2) {
    return {
      model,
      prediction: [],
      metrics: {
        mae: 0,
        mape: 0,
        r2: 0,
      },
    };
  }

  const train = series.slice(0, -steps);
  const actual = series.slice(-steps);

  let prediction: number[] = [];

  if (model === "naive") {
    prediction = naive(train, steps);
  }

  if (model === "moving_average") {
    prediction = movingAvg(train, steps);
  }

  if (model === "linear") {
    prediction = linear(train, steps);
  }

  return {
    model,
    prediction: prediction.map((v) => Number(v.toFixed(2))),
    metrics: {
      mae: Number(mae(actual, prediction).toFixed(2)),
      mape: Number(mape(actual, prediction).toFixed(2)),
      r2: Number(r2(actual, prediction).toFixed(2)),
    },
  };
}