export interface ForecastRequest {
  sales: number[];
  model: "mean" | "prophet" | "xgboost" | "arima";
}

export interface ForecastResponse {
  forecast: number[];
  mape: number;
  mae: number;
  r2: number;
}