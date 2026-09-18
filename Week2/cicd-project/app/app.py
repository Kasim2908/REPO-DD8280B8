from http.server import BaseHTTPRequestHandler, HTTPServer
import datetime


def add(a, b):
    return a + b


def get_message():
    return "CI/CD Pipeline Successful — Application Deployed to AWS EC2!"


HTML = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>DevOps CI/CD Dashboard</title>

    <style>

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            min-height: 100vh;
            font-family: Inter, Arial, Helvetica, sans-serif;
            color: #f8fafc;
            background:
                radial-gradient(
                    circle at 15% 20%,
                    rgba(59, 130, 246, 0.15),
                    transparent 35%
                ),
                radial-gradient(
                    circle at 85% 80%,
                    rgba(124, 58, 237, 0.18),
                    transparent 35%
                ),
                #020617;
            overflow-x: hidden;
        }

        /* Background glow */

        body::before {
            content: "";
            position: fixed;
            width: 500px;
            height: 500px;
            background: rgba(37, 99, 235, 0.08);
            filter: blur(100px);
            border-radius: 50%;
            top: -200px;
            left: -150px;
            pointer-events: none;
        }

        body::after {
            content: "";
            position: fixed;
            width: 500px;
            height: 500px;
            background: rgba(124, 58, 237, 0.08);
            filter: blur(100px);
            border-radius: 50%;
            bottom: -200px;
            right: -150px;
            pointer-events: none;
        }

        /* Main */

        .wrapper {
            width: min(1200px, 92%);
            margin: auto;
            padding: 35px 0 25px;
        }

        /* Navbar */

        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 75px;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .brand-icon {
            width: 48px;
            height: 48px;
            border-radius: 14px;
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 25px;

            background:
                linear-gradient(
                    135deg,
                    #2563eb,
                    #7c3aed
                );

            box-shadow:
                0 0 30px rgba(59, 130, 246, 0.35);
        }

        .brand h2 {
            font-size: 21px;
            letter-spacing: -0.5px;
        }

        .brand span {
            display: block;
            color: #64748b;
            font-size: 12px;
            margin-top: 3px;
        }

        .live {
            display: flex;
            align-items: center;
            gap: 10px;

            padding: 11px 18px;

            border-radius: 50px;

            border: 1px solid rgba(59, 130, 246, 0.35);

            background: rgba(15, 23, 42, 0.7);

            color: #cbd5e1;

            font-size: 13px;
        }

        .live-dot {
            width: 9px;
            height: 9px;

            border-radius: 50%;

            background: #22c55e;

            box-shadow:
                0 0 12px #22c55e;

            animation: pulse 2s infinite;
        }

        @keyframes pulse {

            0% {
                box-shadow: 0 0 5px #22c55e;
            }

            50% {
                box-shadow:
                    0 0 20px #22c55e;
            }

            100% {
                box-shadow: 0 0 5px #22c55e;
            }

        }

        /* Hero */

        .hero {
            text-align: center;
            margin-bottom: 65px;
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;

            padding: 10px 20px;

            border-radius: 50px;

            color: #34d399;

            background:
                rgba(16, 185, 129, 0.08);

            border:
                1px solid rgba(16, 185, 129, 0.35);

            font-size: 13px;
            font-weight: 600;

            margin-bottom: 28px;
        }

        .status-badge .dot {
            width: 10px;
            height: 10px;

            background: #34d399;

            border-radius: 50%;

            box-shadow:
                0 0 14px #34d399;
        }

        .hero h1 {
            font-size: clamp(48px, 7vw, 86px);

            line-height: 0.95;

            letter-spacing: -4px;

            margin-bottom: 25px;

            font-weight: 800;
        }

        .gradient-text {
            background:
                linear-gradient(
                    90deg,
                    #60a5fa,
                    #818cf8,
                    #c084fc
                );

            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero p {
            max-width: 720px;
            margin: auto;

            color: #94a3b8;

            font-size: 17px;

            line-height: 1.7;
        }

        /* Pipeline */

        .pipeline {
            display: grid;

            grid-template-columns:
                repeat(4, 1fr);

            gap: 18px;

            margin-bottom: 30px;
        }

        .stage {
            position: relative;

            padding: 32px 20px;

            text-align: center;

            border-radius: 20px;

            background:
                linear-gradient(
                    145deg,
                    rgba(15, 23, 42, 0.9),
                    rgba(15, 23, 42, 0.55)
                );

            border:
                1px solid rgba(59, 130, 246, 0.25);

            box-shadow:
                inset 0 1px 0 rgba(255,255,255,0.04),
                0 20px 50px rgba(0,0,0,0.2);

            transition:
                transform 0.3s ease,
                border 0.3s ease;
        }

        .stage:hover {
            transform: translateY(-8px);

            border-color:
                rgba(96, 165, 250, 0.6);
        }

        .stage-icon {
            width: 72px;
            height: 72px;

            margin: auto auto 18px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50%;

            font-size: 32px;

            background:
                rgba(30, 64, 175, 0.2);

            border:
                1px solid rgba(96, 165, 250, 0.15);
        }

        .stage h3 {
            font-size: 19px;
            margin-bottom: 7px;
        }

        .stage p {
            color: #64748b;
            font-size: 13px;
        }

        .success {
            position: absolute;

            top: 13px;
            right: 13px;

            width: 27px;
            height: 27px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50%;

            background: #22c55e;

            box-shadow:
                0 0 18px rgba(34,197,94,0.5);

            font-size: 14px;
        }

        /* Arrow */

        .arrow {
            position: absolute;

            right: -18px;
            top: 50%;

            transform: translateY(-50%);

            font-size: 25px;

            color: #3b82f6;

            z-index: 5;
        }

        /* Success */

        .success-box {
            display: flex;

            align-items: center;

            justify-content: space-between;

            padding: 27px 35px;

            margin-top: 30px;

            border-radius: 20px;

            background:
                linear-gradient(
                    90deg,
                    rgba(6, 78, 59, 0.55),
                    rgba(8, 47, 73, 0.55)
                );

            border:
                1px solid rgba(34, 197, 94, 0.6);

            box-shadow:
                0 0 35px rgba(34,197,94,0.08);
        }

        .success-content {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .success-icon {
            width: 60px;
            height: 60px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 17px;

            background:
                linear-gradient(
                    135deg,
                    #22c55e,
                    #10b981
                );

            color: white;

            font-size: 27px;

            box-shadow:
                0 0 25px rgba(34,197,94,0.3);
        }

        .success-text h3 {
            font-size: 19px;
            margin-bottom: 6px;
        }

        .success-text p {
            color: #94a3b8;
            font-size: 13px;
        }

        .version {
            padding-left: 35px;

            border-left:
                1px solid rgba(255,255,255,0.15);

            color: #64748b;

            font-size: 12px;
        }

        .version strong {
            display: block;

            color: #60a5fa;

            font-size: 22px;

            margin-top: 4px;
        }

        /* Footer */

        footer {
            text-align: center;

            padding: 40px 0 10px;

            color: #475569;

            font-size: 12px;
        }

        footer span {
            color: #64748b;
        }

        /* Responsive */

        @media (max-width: 900px) {

            .pipeline {
                grid-template-columns:
                    repeat(2, 1fr);
            }

            .arrow {
                display: none;
            }

        }

        @media (max-width: 600px) {

            .wrapper {
                padding-top: 20px;
            }

            .navbar {
                margin-bottom: 55px;
            }

            .live {
                display: none;
            }

            .hero h1 {
                letter-spacing: -2px;
            }

            .hero p {
                font-size: 15px;
            }

            .pipeline {
                grid-template-columns: 1fr;
            }

            .success-box {
                flex-direction: column;

                align-items: flex-start;

                gap: 20px;

                padding: 25px;
            }

            .version {
                border-left: none;

                border-top:
                    1px solid rgba(255,255,255,0.15);

                padding:
                    20px 0 0;

                width: 100%;
            }

        }

    </style>
</head>


<body>

<div class="wrapper">

    <!-- Navbar -->

    <nav class="navbar">

        <div class="brand">

            <div class="brand-icon">
                ◈
            </div>

            <div>
                <h2>DevOps Demo</h2>
                <span>CI/CD Deployment Dashboard</span>
            </div>

        </div>


        <div class="live">

            <span class="live-dot"></span>

            Live on AWS EC2

        </div>

    </nav>


    <!-- Hero -->

    <section class="hero">

        <div class="status-badge">

            <span class="dot"></span>

            SYSTEM OPERATIONAL

        </div>


        <h1>

            CI/CD Pipeline

            <br>

            <span class="gradient-text">
                is Working! 🚀
            </span>

        </h1>


        <p>

            Your application has been successfully tested,
            containerized, and deployed using GitHub Actions
            on AWS EC2.

        </p>

    </section>


    <!-- Pipeline -->

    <section class="pipeline">


        <div class="stage">

            <div class="success">
                ✓
            </div>

            <div class="stage-icon">
                🧪
            </div>

            <h3>
                Test
            </h3>

            <p>
                Pytest
            </p>

            <span class="arrow">
                →
            </span>

        </div>


        <div class="stage">

            <div class="success">
                ✓
            </div>

            <div class="stage-icon">
                🐳
            </div>

            <h3>
                Build
            </h3>

            <p>
                Docker
            </p>

            <span class="arrow">
                →
            </span>

        </div>


        <div class="stage">

            <div class="success">
                ✓
            </div>

            <div class="stage-icon">
                ⚙️
            </div>

            <h3>
                Deploy
            </h3>

            <p>
                GitHub Actions
            </p>

            <span class="arrow">
                →
            </span>

        </div>


        <div class="stage">

            <div class="success">
                ✓
            </div>

            <div class="stage-icon">
                ☁️
            </div>

            <h3>
                Live
            </h3>

            <p>
                AWS EC2
            </p>

        </div>


    </section>


    <!-- Success -->

    <div class="success-box">

        <div class="success-content">

            <div class="success-icon">
                ✓
            </div>


            <div class="success-text">

                <h3>
                    {{SUCCESS_MESSAGE}}
                </h3>

                <p>
                    Application is running successfully
                    on port 5000. Started {{START_TIME}}.
                </p>

            </div>

        </div>


        <div class="version">

            Version

            <strong>
                v1.0
            </strong>

        </div>

    </div>


    <!-- Footer -->

    <footer>

        Built with ❤️ using

        <span>
            Python • Docker • GitHub Actions • AWS EC2
        </span>

    </footer>

</div>


</body>
</html>
"""

# Timestamp captured once, at process start. If the page you load in the
# browser shows an old timestamp, you are NOT talking to the process you
# just deployed -- an old process/container is still bound to the port.
START_TIME = datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")


class RequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):

        self.send_response(200)

        self.send_header(
            "Content-type",
            "text/html; charset=utf-8"
        )

        self.send_header(
            "Cache-Control",
            "no-cache, no-store, must-revalidate"
        )

        self.end_headers()

        # Render the dynamic success message before sending the page.
        page = HTML.replace(
            "{{SUCCESS_MESSAGE}}", get_message()
        ).replace(
            "{{START_TIME}}", START_TIME
        )

        self.wfile.write(
            page.encode("utf-8")
        )

    def log_message(self, format, *args):
        return
.
class ReusableHTTPServer(HTTPServer):
    allow_reuse_address = True


if __name__ == "__main__":

    server = ReusableHTTPServer(
        ("0.0.0.0", 5000),
        RequestHandler
    )

    print(f"CI/CD application running on port 5000 (started {START_TIME})")

    server.serve_forever()
