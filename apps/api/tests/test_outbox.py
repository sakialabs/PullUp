from __future__ import annotations

from datetime import timedelta

from sqlalchemy import func, select

from pullup_api.database import Database
from pullup_api.models import OutboxEvent
from pullup_api.modules.outbox.service import OutboxProcessor, enqueue_event, utc_now


def test_event_commits_with_domain_transaction_and_is_delivered_once(tmp_path) -> None:
    database = Database(f"sqlite+pysqlite:///{tmp_path / 'outbox.db'}")
    database.create_schema()
    delivered: list[str] = []
    try:
        with database.session_factory.begin() as session:
            event = enqueue_event(
                session,
                topic="place.published",
                aggregate_type="place",
                aggregate_id="place-1",
                payload={"schemaVersion": "place-published.v1"},
            )
            event_id = event.id

        processor = OutboxProcessor(
            {"place.published": lambda current: delivered.append(current.id)}
        )
        with database.session_factory.begin() as session:
            result = processor.process_batch(session)
        with database.session_factory.begin() as session:
            second_result = processor.process_batch(session)
            stored = session.get(OutboxEvent, event_id)

        assert result.published == 1
        assert second_result.published == 0
        assert delivered == [event_id]
        assert stored is not None
        assert stored.published_at is not None
        assert stored.attempt_count == 1
    finally:
        database.dispose()


def test_rolled_back_transaction_does_not_leak_event(tmp_path) -> None:
    database = Database(f"sqlite+pysqlite:///{tmp_path / 'rollback.db'}")
    database.create_schema()
    try:
        with database.session_factory() as session:
            enqueue_event(
                session,
                topic="system.proof",
                aggregate_type="system",
                aggregate_id="proof",
                payload={},
            )
            session.rollback()

        with database.session_factory() as session:
            assert session.scalar(select(func.count()).select_from(OutboxEvent)) == 0
    finally:
        database.dispose()


def test_failed_delivery_records_error_and_becomes_retryable(tmp_path) -> None:
    database = Database(f"sqlite+pysqlite:///{tmp_path / 'retry.db'}")
    database.create_schema()
    now = utc_now()
    try:
        with database.session_factory.begin() as session:
            event = enqueue_event(
                session,
                topic="place.published",
                aggregate_type="place",
                aggregate_id="place-1",
                payload={},
                occurred_at=now,
            )
            event_id = event.id

        def fail(_event: OutboxEvent) -> None:
            raise RuntimeError("adapter unavailable")

        processor = OutboxProcessor(
            {"place.published": fail}, retry_delay=timedelta(seconds=15)
        )
        with database.session_factory.begin() as session:
            result = processor.process_batch(session, now=now)
        with database.session_factory() as session:
            stored = session.get(OutboxEvent, event_id)

        assert result.failed == 1
        assert stored is not None
        assert stored.published_at is None
        assert stored.attempt_count == 1
        assert stored.last_error == "RuntimeError: adapter unavailable"
        retry_at = (now + timedelta(seconds=15)).replace(tzinfo=None)
        assert stored.available_at.replace(tzinfo=None) == retry_at
    finally:
        database.dispose()
