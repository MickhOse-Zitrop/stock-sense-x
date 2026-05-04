import json
import random
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        result = {
            "current_stock": random.randint(800, 1500),
            "turnover_days": random.randint(10, 25),
            "service_level": round(random.uniform(0.85, 0.98), 2),
            "coverage_days": random.randint(15, 30),
            "top_sales": [
                {"name":"Товар1","qty":random.randint(50,200)},
                {"name":"Товар2","qty":random.randint(50,200)}
            ],
            "alerts": ["Товар3 на минимальном запасе", "Сервис ниже 95% по Товар7"],
            "recommendations": ["Увеличить заказ Товар3", "Оптимизировать запасы по Товар7"]
        }

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(result).encode())