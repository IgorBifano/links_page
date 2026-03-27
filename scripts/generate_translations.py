#!/usr/bin/env python3
"""Guard script for a translation workflow that is not configured in this workspace."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TRANSLATIONS_DIR = ROOT / "frontend" / "src" / "i18n" / "translations"


def main() -> int:
    if not TRANSLATIONS_DIR.exists():
      print(
          "Translation workflow not configured for this project.\n"
          "Expected directory not found: "
          f"{TRANSLATIONS_DIR}\n"
          "If you add i18n files later, update scripts/generate_translations.py accordingly.",
          file=sys.stderr,
      )
      return 1

    print(
        "Translation directory exists, but this script is still a placeholder.\n"
        "Implement the project-specific translation workflow before using it."
    )
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
