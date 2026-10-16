from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os

HOST = "0.0.0.0"
PORT = 8000

PROJECT_DIR = Path(__file__).resolve().parent

os.chdir(PROJECT_DIR)


class WebsiteHandler(SimpleHTTPRequestHandler):

    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".webp": "image/webp",
        ".mp4": "video/mp4",
        ".js": "application/javascript",
        ".css": "text/css",
        ".xml": "application/xml",
    }

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()


def main():
    server = ThreadingHTTPServer(
        (HOST, PORT),
        WebsiteHandler
    )

    print("=" * 50)
    print("RAJLAXMI WATER BORING WEBSITE")
    print("=" * 50)
    print(f"Project Folder: {PROJECT_DIR}")
    print(f"Local Website: http://127.0.0.1:{PORT}")
    print("Press CTRL + C to stop the server.")
    print("=" * 50)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()