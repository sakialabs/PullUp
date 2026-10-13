from __future__ import annotations

from pathlib import Path

from alembic import command
from alembic.config import Config
from sqlalchemy import create_engine, inspect

API_ROOT = Path(__file__).resolve().parents[1]


def test_initial_migration_upgrades_and_downgrades(
    tmp_path: Path,
    monkeypatch,
) -> None:
    database_path = tmp_path / "migration.db"
    database_url = f"sqlite+pysqlite:///{database_path}"
    monkeypatch.setenv("PULLUP_DATABASE_URL", database_url)

    config = Config(str(API_ROOT / "alembic.ini"))
    command.upgrade(config, "head")

    engine = create_engine(database_url)
    tables = set(inspect(engine).get_table_names())
    assert {
        "alembic_version",
        "places",
        "providers",
        "buildings",
        "sources",
        "total_damage_versions",
        "total_damage_line_items",
        "outbox_events",
    }.issubset(tables)

    command.check(config)

    command.downgrade(config, "base")
    assert set(inspect(engine).get_table_names()) == {"alembic_version"}
    engine.dispose()
