import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error, r2_score

def mape(y_true, y_pred):
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    mask = y_true != 0
    return np.mean(np.abs((y_true[mask] - y_pred[mask]) / y_true[mask])) * 100

def mae(y_true, y_pred):
    return mean_absolute_error(y_true, y_pred)

def r2(y_true, y_pred):
    return r2_score(y_true, y_pred)

def prepare_sales(data):
    if isinstance(data, list):
        return pd.Series(data)
    elif isinstance(data, pd.Series):
        return data
    else:
        raise ValueError("data должно быть list или pd.Series")

def create_lag_features(series, lags=3):
    df = pd.DataFrame({"y": series})
    for lag in range(1, lags+1):
        df[f"lag{lag}"] = df["y"].shift(lag)
    df.dropna(inplace=True)
    return df