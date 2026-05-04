import json
from http.server import BaseHTTPRequestHandler

import pandas as pd


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers["Content-Length"])
        body = self.rfile.read(content_length)
        data = json.loads(body)

        items = data.get("items", [])
        if not items:
            result = {"error": "Нет данных"}
        else:
            df = pd.DataFrame(items)
            df['ABC'] = pd.qcut(df['revenue'], 3, labels=['C','B','A'])
            df['XYZ'] = pd.qcut(df['variation'], 3, labels=['Z','Y','X'])
            df['strategy'] = df['ABC'].astype(str) + df['XYZ'].astype(str)
            result = df.to_dict(orient='records')

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(result).encode())