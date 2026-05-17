export type ModelType = "naive" | "moving_average" | "linear" | "exp_smoothing";

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function mean(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
}

// --------------------------------------------------
// Naive
// --------------------------------------------------

export function naive(series: number[], steps = 4) {
  const last = series.at(-1) ?? 0;

  return Array(steps).fill(last);
}

// --------------------------------------------------
// Moving Average
// --------------------------------------------------

export function movingAvg(series: number[], steps = 4, window = 3) {
  const values = series.slice(-window);
  const avg = mean(values);

  return Array(steps).fill(avg);
}

// --------------------------------------------------
// Exponential Smoothing
// --------------------------------------------------

export function exponentialSmoothing(series: number[], steps = 4, alpha = 0.4) {
  if (series.length === 0) {
    return Array(steps).fill(0);
  }

  let smoothed = series[0];

  for (let i = 1; i < series.length; i++) {
    smoothed = alpha * series[i] + (1 - alpha) * smoothed;
  }

  return Array(steps).fill(smoothed);
}

// --------------------------------------------------
// Linear Regression
// --------------------------------------------------

export function linear(series: number[], steps = 4) {
  const n = series.length;

  if (n < 2) {
    return naive(series, steps);
  }

  const x = Array.from({ length: n }, (_, i) => i);
  const y = series;

  const xMean = mean(x);
  const yMean = mean(y);

  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < n; i++) {
    numerator += (x[i] - xMean) * (y[i] - yMean);
    denominator += (x[i] - xMean) ** 2;
  }

  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = yMean - slope * xMean;

  // Если тренд почти отсутствует
  if (Math.abs(slope) < 0.0001) {
    return movingAvg(series, steps);
  }

  return Array.from({ length: steps }, (_, i) => {
    return slope * (n + i) + intercept;
  });
}

// --------------------------------------------------
// Metrics
// --------------------------------------------------

export function mae(actual: number[], predicted: number[]) {
  const n = Math.min(actual.length, predicted.length);

  return (
    actual.slice(0, n).reduce((sum, value, i) => {
      return sum + Math.abs(value - predicted[i]);
    }, 0) / n
  );
}

export function mape(actual: number[], predicted: number[]) {
  const n = Math.min(actual.length, predicted.length);

  let count = 0;

  const total = actual.slice(0, n).reduce((sum, value, i) => {
    if (value === 0) {
      return sum;
    }

    count++;

    return sum + Math.abs((value - predicted[i]) / value);
  }, 0);

  return count === 0 ? 0 : (total / count) * 100;
}

export function r2(actual: number[], predicted: number[]) {
  const n = Math.min(actual.length, predicted.length);

  const avg = mean(actual.slice(0, n));

  let ssTot = 0;
  let ssRes = 0;

  for (let i = 0; i < n; i++) {
    ssTot += (actual[i] - avg) ** 2;
    ssRes += (actual[i] - predicted[i]) ** 2;
  }

  if (ssTot === 0) {
    return 0;
  }

  return 1 - ssRes / ssTot;
}

// --------------------------------------------------
// Auto Select Best Model
// --------------------------------------------------

export function findBestModel(series: number[], steps = 4) {
  const models: ModelType[] = [
    "naive",
    "moving_average",
    "linear",
    "exp_smoothing",
  ];

  const results = models.map((model) => runForecast(series, model, steps));

  results.sort((a, b) => a.metrics.mae - b.metrics.mae);

  return results[0];
}

// --------------------------------------------------
// Main Forecast Runner
// --------------------------------------------------

export function runForecast(
  series: number[],
  model: ModelType = "exp_smoothing",
  steps = 4,
) {
  if (series.length < steps + 3) {
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

  switch (model) {
    case "naive":
      prediction = naive(train, steps);
      break;

    case "moving_average":
      prediction = movingAvg(train, steps);
      break;

    case "linear":
      prediction = linear(train, steps);
      break;

    case "exp_smoothing":
      prediction = exponentialSmoothing(train, steps);
      break;
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