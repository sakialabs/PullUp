from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


def _repository_root() -> Path:
    return Path(__file__).resolve().parents[3]


def _as_bool(value: str | None, *, default: bool) -> bool:
    if value is None:
        return default
    normalized = value.strip().lower()
    if normalized in {"1", "true", "yes", "on"}:
        return True
    if normalized in {"0", "false", "no", "off"}:
        return False
    raise ValueError(f"Expected a boolean environment value, received {value!r}")


def normalize_database_url(value: str) -> str:
    """Select explicit SQLAlchemy drivers while accepting common platform URLs."""
    if value.startswith("postgres://"):
        return value.replace("postgres://", "postgresql+psycopg://", 1)
    if value.startswith("postgresql://"):
        return value.replace("postgresql://", "postgresql+psycopg://", 1)
    if value.startswith("sqlite:///") and not value.startswith("sqlite+pysqlite:///"):
        return value.replace("sqlite:///", "sqlite+pysqlite:///", 1)
    return value


@dataclass(frozen=True, slots=True)
class Settings:
    database_url: str
    fixture_path: Path
    auto_create_schema: bool = True
    seed_synthetic: bool = True
    service_name: str = "pullup-api"

    @classmethod
    def from_env(cls) -> Settings:
        fixture_default = (
            _repository_root()
            / "packages"
            / "contracts"
            / "fixtures"
            / "cedar-commons.synthetic.v1.json"
        )
        return cls(
            database_url=normalize_database_url(
                os.getenv("PULLUP_DATABASE_URL", "sqlite+pysqlite:///./pullup.db")
            ),
            fixture_path=Path(os.getenv("PULLUP_FIXTURE_PATH", fixture_default)).resolve(),
            auto_create_schema=_as_bool(
                os.getenv("PULLUP_AUTO_CREATE_SCHEMA"), default=True
            ),
            seed_synthetic=_as_bool(os.getenv("PULLUP_SEED_SYNTHETIC"), default=True),
            service_name=os.getenv("PULLUP_SERVICE_NAME", "pullup-api"),
        )
