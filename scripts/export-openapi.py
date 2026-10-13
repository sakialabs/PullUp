from __future__ import annotations

import argparse
import json
from pathlib import Path

from pullup_api.main import create_app


def main() -> None:
    parser = argparse.ArgumentParser(description="Export the versioned PullUp OpenAPI contract")
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("packages/contracts/openapi/pullup-api.v1.json"),
    )
    args = parser.parse_args()
    output = args.output.resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(create_app().openapi(), indent=2, sort_keys=True) + "\n"
    output.write_text(payload, encoding="utf-8")


if __name__ == "__main__":
    main()
