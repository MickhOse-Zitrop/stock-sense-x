import json
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers["Content-Length"])
        body = self.rfile.read(content_length)
        data = json.loads(body)

        avg_demand = data.get("avg_demand", 0)
        lead_time = data.get("lead_time", 0)
        service_level = data.get("service_level", 0.95)

        if avg_demand <= 0 or lead_time <= 0:
            result = {"error": "Неверные параметры"}
        else:
            safety_stock = avg_demand * lead_time * service_level
            reorder_point = avg_demand * lead_time + safety_stock
            result = {
                "safety_stock": safety_stock,
                "reorder_point": reorder_point
            }

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(result).encode())