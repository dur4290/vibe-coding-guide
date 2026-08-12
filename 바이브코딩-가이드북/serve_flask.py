from pathlib import Path

from flask import Flask, send_from_directory


BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "dist"

app = Flask(__name__, static_folder=str(DIST_DIR), static_url_path="")


@app.get("/")
def index():
    return send_from_directory(DIST_DIR, "index.html")


@app.get("/<path:path>")
def spa(path: str):
    target = DIST_DIR / path
    if target.is_file():
        return send_from_directory(DIST_DIR, path)
    return send_from_directory(DIST_DIR, "index.html")


if __name__ == "__main__":
    if not DIST_DIR.exists():
        raise SystemExit("dist folder is missing. Run npm.cmd run build first.")
    app.run(host="127.0.0.1", port=5000, debug=False)
