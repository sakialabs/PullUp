from __future__ import annotations

from collections.abc import Callable, Mapping
from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
from typing import Any
from uuid import uuid4

from sqlalchemy import Select, select
from sqlalchemy.orm import Session

from pullup_api.models import OutboxEvent

OutboxHandler = Callable[[OutboxEvent], None]


def utc_now() -> datetime:
    return datetime.now(UTC)


def enqueue_event(
    session: Session,
    *,
    topic: str,
    aggregate_type: str,
    aggregate_id: str,
    payload: Mapping[str, Any],
    occurred_at: datetime | None = None,
) -> OutboxEvent:
    """Add an event to the caller's transaction without committing it."""
    timestamp = occurred_at or utc_now()
    event = OutboxEvent(
        id=str(uuid4()),
        topic=topic,
        aggregate_type=aggregate_type,
        aggregate_id=aggregate_id,
        payload=dict(payload),
        occurred_at=timestamp,
        available_at=timestamp,
        attempt_count=0,
    )
    session.add(event)
    return event


@dataclass(frozen=True, slots=True)
class BatchResult:
    published: int
    failed: int


class OutboxProcessor:
    """Claim and deliver committed events.

    Delivery is at least once: handlers must deduplicate by ``event.id`` before
    performing an external effect.
    """

    def __init__(
        self,
        handlers: Mapping[str, OutboxHandler],
        *,
        retry_delay: timedelta = timedelta(seconds=30),
    ) -> None:
        self.handlers = dict(handlers)
        self.retry_delay = retry_delay

    @staticmethod
    def pending_query(now: datetime, batch_size: int) -> Select[tuple[OutboxEvent]]:
        return (
            select(OutboxEvent)
            .where(
                OutboxEvent.published_at.is_(None),
                OutboxEvent.available_at <= now,
            )
            .order_by(OutboxEvent.occurred_at, OutboxEvent.id)
            .limit(batch_size)
            .with_for_update(skip_locked=True)
        )

    def process_batch(
        self,
        session: Session,
        *,
        batch_size: int = 50,
        now: datetime | None = None,
    ) -> BatchResult:
        processed_at = now or utc_now()
        events = list(session.scalars(self.pending_query(processed_at, batch_size)))
        published = 0
        failed = 0

        for event in events:
            event.attempt_count += 1
            try:
                handler = self.handlers[event.topic]
                handler(event)
            except Exception as error:  # noqa: BLE001 - failures must become durable retry state
                event.last_error = f"{type(error).__name__}: {error}"[:2000]
                event.available_at = processed_at + self.retry_delay
                failed += 1
            else:
                event.published_at = processed_at
                event.last_error = None
                published += 1

        return BatchResult(published=published, failed=failed)
