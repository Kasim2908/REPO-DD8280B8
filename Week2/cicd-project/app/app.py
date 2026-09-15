from http.server import BaseHTTPRequestHandler, HTTPServer


def add(a, b):
    return a + b


def get_message():
    return "CI/CD pipeline is working!"


class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.wfile.write(get_message().encode())

    def log_message(self, format, *args):
        return


if __name__ == "__main__":
    server = HTTPServer(("0.0.0.0", 5000), RequestHandler)
    print("Application running on port 5000")
    server.serve_forever()
