from http.server import BaseHTTPRequestHandler, HTTPServer


def add(a, b):
    return a + b


def get_message():
    return "CI/CD pipeline is working!"


HTML = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>CI/CD Pipeline</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background:
                radial-gradient(circle at top left, #243b55, transparent 40%),
                radial-gradient(circle at bottom right, #1d2671, transparent 40%),
                #0f172a;
            color: white;
            padding: 20px;
        }

        .container {
            width: 100%;
            max-width: 850px;
        }

        .card {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 24px;
            padding: 50px;
            backdrop-filter: blur(18px);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
        }

        .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            border-radius: 50px;
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: #4ade80;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 25px;
        }

        .dot {
            width: 9px;
            height: 9px;
            background: #4ade80;
            border-radius: 50%;
            box-shadow: 0 0 12px #4ade80;
        }

        h1 {
            font-size: 48px;
            line-height: 1.1;
            margin-bottom: 18px;
        }

        .highlight {
            background: linear-gradient(90deg, #60a5fa, #a78bfa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .description {
            color: #cbd5e1;
            font-size: 18px;
            line-height: 1.7;
            margin-bottom: 35px;
        }

        .pipeline {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin: 35px 0;
        }

        .stage {
            padding: 20px 10px;
            text-align: center;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            transition: 0.3s ease;
        }

        .stage:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.1);
        }

        .icon {
            font-size: 28px;
            margin-bottom: 10px;
        }

        .stage h3 {
            font-size: 14px;
            margin-bottom: 5px;
        }

        .stage p {
            font-size: 12px;
            color: #94a3b8;
        }

        .status {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 20px;
            background: rgba(15, 23, 42, 0.7);
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-top: 25px;
        }

        .status-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .check {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #16a34a;
            border-radius: 50%;
            font-weight: bold;
        }

        .status-text strong {
            display: block;
            margin-bottom: 3px;
        }

        .status-text span {
            font-size: 13px;
            color: #94a3b8;
        }

        .version {
            color: #60a5fa;
            font-size: 13px;
            font-weight: bold;
        }

        footer {
            text-align: center;
            margin-top: 25px;
            color: #64748b;
            font-size: 13px;
        }

        @media (max-width: 700px) {
            .card {
                padding: 30px 20px;
            }

            h1 {
                font-size: 36px;
            }

            .pipeline {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 400px) {
            .pipeline {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>

<body>

    <div class="container">

        <div class="card">

            <div class="badge">
                <span class="dot"></span>
                SYSTEM OPERATIONAL
            </div>

            <h1>
                CI/CD Pipeline
                <br>
                <span class="highlight">Deployment Successful 🚀</span>
            </h1>

            <p class="description">
                Your application has been successfully tested, containerized,
                and deployed using a modern DevOps workflow.
            </p>

            <div class="pipeline">

                <div class="stage">
                    <div class="icon">🧪</div>
                    <h3>Test</h3>
                    <p>Pytest</p>
                </div>

                <div class="stage">
                    <div class="icon">🐳</div>
                    <h3>Build</h3>
                    <p>Docker</p>
                </div>

                <div class="stage">
                    <div class="icon">⚙️</div>
                    <h3>Deploy</h3>
                    <p>GitHub Actions</p>
                </div>

                <div class="stage">
                    <div class="icon">☁️</div>
                    <h3>Cloud</h3>
                    <p>AWS EC2</p>
                </div>

            </div>

            <div class="status">

                <div class="status-left">

                    <div class="check">
                        ✓
                    </div>

                    <div class="status-text">
                        <strong>
                            CI/CD pipeline is working!
                        </strong>

                        <span>
                            Application is running successfully
                        </span>
                    </div>

                </div>

                <div class="version">
                    v1.0
                </div>

            </div>

        </div>

        <footer>
            Built with Python • Docker • GitHub Actions • AWS EC2
        </footer>

    </div>

</body>
</html>
"""


class RequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):

        self.send_response(200)

        self.send_header(
            "Content-type",
            "text/html; charset=utf-8"
        )

        self.end_headers()

        self.wfile.write(
            HTML.encode("utf-8")
        )

    def log_message(self, format, *args):
        return


if __name__ == "__main__":

    server = HTTPServer(
        ("0.0.0.0", 5000),
        RequestHandler
    )

    print("Application running on port 5000")

    server.serve_forever()
