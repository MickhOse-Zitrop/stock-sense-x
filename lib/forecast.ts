type ForecastResult = {
  prediction: number[];
  metrics: {
    mape: number;
    mae: number;
    r2: number;
  };
};

function ema(series: number[], alpha = 0.4) {
  const result: number[] = [];
  let prev = series[0];

  for (let i = 0; i < series.length; i++) {
    const value = i === 0 ? series[0] : alpha * series[i] + (1 - alpha) * prev;

    result.push(value);
    prev = value;
  }

  return result;
}

function mean(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function mae(a: number[], b: number[]) {
  return mean(a.map((v, i) => Math.abs(v - b[i])));
}

function mape(a: number[], b: number[]) {
  return mean(a.map((v, i) => Math.abs((v - b[i]) / (v || 1)))) * 100;
}

function r2(a: number[], b: number[]) {
  const meanA = mean(a);

  const ssTot = a.reduce((s, v) => s + Math.pow(v - meanA, 2), 0);
  const ssRes = a.reduce((s, v, i) => s + Math.pow(v - b[i], 2), 0);

  return 1 - ssRes / ssTot;
}

export function findBestModel(series: number[]): ForecastResult {
  if (series.length < 3) {
    return {
      prediction: series,
      metrics: { mape: 0, mae: 0, r2: 0 },
    };
  }

  // сглаживание
  const smoothed = ema(series, 0.4);

  // тренд (простая линейная аппроксимация)
  const n = smoothed.length;
  const xMean = (n - 1) / 2;
  const yMean = mean(smoothed);

  let num = 0;
  let den = 0;

  for (let i = 0; i < n; i++) {
    num += (i - xMean) * (smoothed[i] - yMean);
    den += Math.pow(i - xMean, 2);
  }

  const slope = den === 0 ? 0 : num / den;
  const intercept = yMean - slope * xMean;

  // прогноз на N дней вперёд
  const horizon = 7;

  const prediction: number[] = [];

  for (let i = 0; i < horizon; i++) {
    const next = intercept + slope * (n + i);
    prediction.push(Math.max(0, next));
  }

  // метрики (на сглаженном)
  const minLen = Math.min(series.length, smoothed.length);

  const yTrue = series.slice(0, minLen);
  const yPred = smoothed.slice(0, minLen);

  return {
    prediction,
    metrics: {
      mape: Number(mape(yTrue, yPred).toFixed(2)),
      mae: Number(mae(yTrue, yPred).toFixed(2)),
      r2: Number(r2(yTrue, yPred).toFixed(3)),
    },
  };
}