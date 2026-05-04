import { create } from "zustand/react";
import { ForecastRequest, ForecastResponse } from "@/services/dto/forecast.dto";
import { Api } from "@/services/api-client";

export interface ForecastState {
  loading: boolean;
  error: boolean;
  sales: number[];
  model: ForecastRequest["model"];
  forecast: number[];
  mape: number;
  mae: number;
  r2: number;

  setSales: (sales: number[]) => void;
  setModel: (model: ForecastRequest["model"]) => void;
  fetchForecast: () => Promise<void>;
}

export const useForecastStore = create<ForecastState>((set, get) => ({
  sales: [],
  model: "mean",
  forecast: [],
  mape: 0,
  mae: 0,
  r2: 0,
  loading: true,
  error: false,

  setSales: (sales) => set({ sales }),

  setModel: (model) => set({ model }),

  fetchForecast: async () => {
    const { sales, model } = get();
    if (!sales.length) {
      set({ error: true });
      return;
    }

    set({ loading: true, error: false });

    try {
      const res: ForecastResponse = await Api.forecast.getForecast({
        sales,
        model,
      });
      set({ ...res });
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));