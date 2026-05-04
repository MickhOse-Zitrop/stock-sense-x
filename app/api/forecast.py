import json
from http.server import BaseHTTPRequestHandler

import numpy as np
import pandas as pd
from prophet import Prophet
from statsmodels.tsa.arima.model import ARIMA

from utils import mape, mae, r2, prepare_sales
from xgboost import XGBRegressor


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers["Content-Length"])
        body = self.rfile.read(content_length)
        data = json.loads(body)

        sales_data = data.get("sales", [])
        model_type = data.get("model", "mean")

        if len(sales_data) < 2:
            result = {"error": "Нужно больше данных"}
        else:
            series = prepare_sales(sales_data)
            forecast = []

            if model_type == "mean":
                forecast = [float(np.mean(series[-7:]))] * 7

            elif model_type == "prophet":
                df = pd.DataFrame({
                    "ds": pd.date_range(start="2023-01-01", periods=len(series)),
                    "y": series
                })
                model = Prophet(daily_seasonality=True)
                model.fit(df)
                future = model.make_future_dataframe(periods=7)
                forecast = model.predict(future)["yhat"][-7:].tolist()

            elif model_type == "xgboost":
                df = pd.DataFrame({"y": series})
                df["lag1"] = df["y"].shift(1)
                df.dropna(inplace=True)
                X = df[["lag1"]]
                y = df["y"]
                model = XGBRegressor()
                model.fit(X, y)
                last_val = series.iloc[-1]
                for _ in range(7):
                    pred = model.predict(np.array([[last_val]]))[0]
                    forecast.append(float(pred))
                    last_val = pred

            elif model_type == "arima":
                if len(series) < 10:
                    forecast = [float(np.mean(series))] * 7
                else:
                    model = ARIMA(series, order=(1,1,1))
                    model_fit = model.fit()
                    forecast = model_fit.forecast(7).tolist()

            else:
                result = {"error": f"Неизвестная модель: {model_type}"}
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(result).encode())
                return

            n = min(len(series), 7)
            forecast_train = forecast[:n]
            result = {
                "forecast": forecast,
                "mape": float(mape(series[-n:], forecast_train)),
                "mae": float(mae(series[-n:], forecast_train)),
                "r2": float(r2(series[-n:], forecast_train))
            }

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(result).encode())