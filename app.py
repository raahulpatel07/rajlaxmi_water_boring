from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import os
import socket
import threading
import webbrowser


# Rajlaxmi Water Boring
# Local development server

BASE_DIR = Path(__file__).resolve().parent

HOST = "0.0.0.0"
PORT = 8000

os.chdir(BASE_DIR)


def get_local_ip():

    try:

        with socket.socket(
            socket.AF_INET,
            socket.SOCK_DGRAM
        ) as sock:

            sock.connect(("8.8.8.8", 80))

            return sock.getsockname()[0]

    except OSError:

        return "127.0.0.1"


def open_browser():

    webbrowser.open(
        f"http://127.0.0.1:{PORT}"
    )


def main():

    local_ip = get_local_ip()

    server = ThreadingHTTPServer(
        (HOST, PORT),
        SimpleHTTPRequestHandler
    )

    print("=" * 50)
    print("          RAJLAXMI WATER BORING")
    print("=" * 50)

    print("\nWebsite server started!")

    print("\nLaptop URL:")
    print(f"http://127.0.0.1:{PORT}")

    print("\nMobile URL (same Wi-Fi):")
    print(f"http://{local_ip}:{PORT}")

    print("\nBusiness: Rajlaxmi Water Boring")
    print("Contact: 8303746358")
    print("Location: Bharatkoop Mandir, Chitrakoot, UP")

    print("\nPress CTRL + C to stop.")

    threading.Timer(1, open_browser).start()

    try:
        server.serve_forever()

    except KeyboardInterrupt:
        print("\nServer stopped.")

    finally:
        server.server_close()


if __name__ == "__main__":
    main()