import { axiosInstance } from "@/services/instance";
import { ForecastRequest, ForecastResponse } from "@/services/dto/forecast.dto";

export const getForecast = async (
  data: ForecastRequest,
): Promise<ForecastResponse> => {
  return (await axiosInstance.post<ForecastResponse>("/forecast", data)).data;
};