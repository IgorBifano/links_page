#!/usr/bin/env python3
"""Generate incremental i18n JSON files from pt-BR using Google Translate API."""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
TRANSLATIONS_DIR = ROOT / "frontend" / "src" / "i18n" / "translations"
BASE_FILE = TRANSLATIONS_DIR / "pt-BR.json"
EN_FILE = TRANSLATIONS_DIR / "en.json"
BACKEND_ENV_FILE = ROOT / "backend" / ".env"
TARGET_LANGUAGES = ["en", "es", "fr", "de", "it", "ja", "zh", "ru"]
API_URL = "https://translation.googleapis.com/language/translate/v2"
NON_TRANSLATABLE_KEYS = {"sidebar.code", "codePage.title"}


def load_json(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: Path, content: dict[str, Any]) -> None:
    path.write_text(json.dumps(content, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def load_backend_env() -> None:
    if os.getenv("GOOGLE_TRANSLATE_API_KEY") or not BACKEND_ENV_FILE.exists():
        return

    for line in BACKEND_ENV_FILE.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue

        key, value = stripped.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def translate_text(text: str, target_language: str, api_key: str) -> str:
    payload = urllib.parse.urlencode(
        {
            "q": text,
            "source": "pt-BR",
            "target": target_language,
            "format": "text",
            "key": api_key,
        }
    ).encode("utf-8")
    request = urllib.request.Request(API_URL, data=payload, method="POST")

    with urllib.request.urlopen(request) as response:
        data = json.loads(response.read().decode("utf-8"))
        return data["data"]["translations"][0]["translatedText"]


def merge_missing(
    source: dict[str, Any],
    english: dict[str, Any],
    current: dict[str, Any],
    target_language: str,
    api_key: str,
    path: str = "",
) -> dict[str, Any]:
    result = dict(current)

    for key, value in source.items():
        next_path = f"{path}.{key}" if path else key
        english_value = english.get(key)

        if isinstance(value, dict):
            current_branch = result.get(key)
            if not isinstance(current_branch, dict):
                current_branch = {}
            english_branch = english_value if isinstance(english_value, dict) else {}
            result[key] = merge_missing(value, english_branch, current_branch, target_language, api_key, next_path)
            continue

        if next_path in NON_TRANSLATABLE_KEYS:
            result[key] = value
            continue

        existing = result.get(key)
        english_string = english_value if isinstance(english_value, str) else None
        should_refresh_from_english = (
            target_language != "en"
            and isinstance(existing, str)
            and isinstance(english_string, str)
            and existing.strip()
            and existing == english_string
        )

        if isinstance(existing, str) and existing.strip() and not should_refresh_from_english:
            continue

        print(f"Translating {next_path} -> {target_language}")
        result[key] = translate_text(value, target_language, api_key)

    return result


def main() -> int:
    load_backend_env()
    api_key = os.getenv("GOOGLE_TRANSLATE_API_KEY")
    if not api_key:
        print("Missing GOOGLE_TRANSLATE_API_KEY", file=sys.stderr)
        return 1

    base_content = load_json(BASE_FILE)
    english_content = load_json(EN_FILE)
    if not base_content:
        print(f"Base translation file not found or empty: {BASE_FILE}", file=sys.stderr)
        return 1

    for language in TARGET_LANGUAGES:
        target_file = TRANSLATIONS_DIR / f"{language}.json"
        current_content = load_json(target_file)
        try:
            merged = merge_missing(base_content, english_content, current_content, language, api_key)
        except urllib.error.HTTPError as exc:
            print(f"Google Translate API error for {language}: {exc.read().decode('utf-8')}", file=sys.stderr)
            return 1
        except urllib.error.URLError as exc:
            print(f"Network error for {language}: {exc}", file=sys.stderr)
            return 1

        save_json(target_file, merged)
        print(f"Updated {target_file}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
