"use client";

import { useForecastStore } from "@/store";
import { useEffect } from "react";

export const useForecast = () => {
  const forecastState = useForecastStore((state) => state);

  useEffect(() => {
    if (forecastState.sales.length > 0) {
      forecastState.fetchForecast().then();
    }
  }, [forecastState.sales]);

  return forecastState;
};