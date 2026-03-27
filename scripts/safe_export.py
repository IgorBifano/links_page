from __future__ import annotations

import re
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
EXPORT_DIR = ROOT / "safe_export"

EXCLUDED_DIR_NAMES = {
    ".git",
    ".next",
    ".pytest_cache",
    "__pycache__",
    "node_modules",
    "safe_export",
    "storage",
    "venv",
}

EXCLUDED_FILE_NAMES = {
    "credentials.json",
    "firebase-adminsdk.json",
    "service-account.json",
}

EXCLUDED_SUFFIXES = {
    ".crt",
    ".key",
    ".pem",
}

SENSITIVE_LINE_PATTERNS = [
    re.compile(r"(^\s*OPENAI_API_KEY\s*=\s*).*$", re.MULTILINE),
    re.compile(r"(^\s*ANTHROPIC_API_KEY\s*=\s*).*$", re.MULTILINE),
    re.compile(r"(^\s*GOOGLE_TRANSLATE_API_KEY\s*=\s*).*$", re.MULTILINE),
    re.compile(r"(^\s*SECRET_KEY\s*=\s*).*$", re.MULTILINE),
    re.compile(r"(^\s*DATABASE_URL\s*=\s*).*$", re.MULTILINE),
]

README_EXPORT = """# Safe Export

- projeto sanitizado
- sem dados sensíveis
- uso apenas para análise
"""


def should_exclude(path: Path) -> bool:
    if path.name in EXCLUDED_DIR_NAMES or path.name in EXCLUDED_FILE_NAMES:
        return True
    if path.suffix.lower() in EXCLUDED_SUFFIXES:
        return True
    if path.name == ".env" or path.name.startswith(".env."):
        return True
    return False


def iter_project_files() -> list[Path]:
    try:
        result = subprocess.run(
            ["git", "ls-files", "--cached", "--others", "--exclude-standard"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=True,
        )
        return [ROOT / line for line in result.stdout.splitlines() if line.strip()]
    except (subprocess.CalledProcessError, FileNotFoundError):
        files: list[Path] = []
        for path in ROOT.rglob("*"):
            if not path.is_file():
                continue
            if any(part in EXCLUDED_DIR_NAMES for part in path.parts):
                continue
            files.append(path)
        return files


def copy_project(tmp_dir: Path) -> None:
    for source in iter_project_files():
        if should_exclude(source):
            continue

        relative_path = source.relative_to(ROOT)
        if any(part in EXCLUDED_DIR_NAMES for part in relative_path.parts):
            continue

        destination = tmp_dir / relative_path
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)


def sanitize_export(export_root: Path) -> None:
    for path in export_root.rglob("*"):
        if not path.is_file():
            continue
        if should_exclude(path):
            path.unlink(missing_ok=True)
            continue

        try:
            content = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue

        sanitized = content
        for pattern in SENSITIVE_LINE_PATTERNS:
            sanitized = pattern.sub(r"\1***REMOVED***", sanitized)

        if sanitized != content:
            path.write_text(sanitized, encoding="utf-8")


def write_export_readme(export_root: Path) -> None:
    (export_root / "README_EXPORT.md").write_text(README_EXPORT, encoding="utf-8")


def main() -> None:
    if EXPORT_DIR.exists():
        shutil.rmtree(EXPORT_DIR)

    EXPORT_DIR.mkdir(parents=True, exist_ok=True)
    copy_project(EXPORT_DIR)
    sanitize_export(EXPORT_DIR)
    write_export_readme(EXPORT_DIR)

    print(f"Safe export generated at: {EXPORT_DIR}")


if __name__ == "__main__":
    main()
